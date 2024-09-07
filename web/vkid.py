import logging

from fastapi import APIRouter, Depends, Response

from application.vkid.client.client import VKIDClient, get_vkid_client
from application.vkid.client.config import vkid_config
from application.vkid.client.exception import VKIDAuthException
from application.vkid.client.models import VKIDFirstStepParams, VKIDSecondStepParams
from application.vkid.client.store import vkid_store
from application.vkid.jwt_manager import jwt_instance_manager
from application.vkid.jwt_manager.model import JWTModelProfile
from application.vkid.security import vk_security
from web.app import app

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/vkid", tags=["vkid"])


@router.post("/first_step")
async def vkid_first_step() -> VKIDFirstStepParams:
    """Return first step params to login page on vkid"""
    state, code_challenge = vkid_store.generate()
    code_verifier = vkid_store.get(state=state)
    logger.debug(f"vkid_first_step on {state=} {code_verifier=}")
    return VKIDFirstStepParams(
        code_challenge=code_challenge,
        state=state,
        client_id=vkid_config.client_id,
        redirect_uri=vkid_config.frontend_url,
    )


@router.post("/second_step")
async def vkid_second_step(
    params: VKIDSecondStepParams,
    response: Response,
    vkid_client: VKIDClient = Depends(get_vkid_client),
) -> None:
    """Return auth cookies"""
    code_verifier = vkid_store.get(state=params.state)
    authorized_token = await vkid_client.authorize(
        grant_type="authorization_code",
        code_verifier=code_verifier,
        redirect_uri=vkid_config.frontend_url,
        code=params.code,
        client_id=vkid_config.client_id,
        device_id=params.device_id,
        state=params.state,
    )
    profiles = await vkid_client.get_profile_info(
        access_token=authorized_token.access_token, user_ids=str(authorized_token.user_id), fields="photo_max"
    )
    if not profiles.response or len(profiles.response) > 1:
        raise VKIDAuthException(error_description="VKID не уникален для параметров пользователя")
    profile = profiles.response[0]
    if not vkid_config.has_access_admin_page_user(user_id=profile.id):
        raise VKIDAuthException(error_description="Пользователь не имеет прав на администрирование")
    tokens = jwt_instance_manager.encode(profile=profile)
    response.set_cookie(
        "Authorization", tokens.access_token, httponly=True, expires=jwt_instance_manager.access_lifetime
    )
    return None


@router.get("/profile")
async def vkid_profile(profile: JWTModelProfile = Depends(vk_security)) -> JWTModelProfile:
    """Return user profile"""
    return profile


@router.post("/logout")
async def vkid_logout(response: Response) -> None:
    """Clear auth cookies"""
    response.delete_cookie(key="Authorization")
    return None


app.include_router(router)
