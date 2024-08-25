from fastapi import APIRouter

from application.vkid.client.client import vkid_client
from application.vkid.client.config import vkid_config
from application.vkid.client.models import VKIDFirstStepParams, VKIDSecondStepParams
from application.vkid.client.store import vkid_store
from web.app import app

router = APIRouter(prefix="/api/v1/vkid", tags=["vkid"])


@router.post("/first_step")
async def vkid_first_step() -> VKIDFirstStepParams:
    """Return first step params to login page on vkid"""
    state, code_challenge = vkid_store.generate()
    return VKIDFirstStepParams(
        code_challenge=code_challenge,
        state=state,
        client_id=vkid_config.client_id,
    )


@router.post("/second_step")
async def vkid_second_step(params: VKIDSecondStepParams) -> None:
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
    _ = await vkid_client.get_profile_info(
        access_token=authorized_token.access_token, user_ids=str(authorized_token.user_id), fields="photo_max"
    )
    return None


@router.post("/logout")
async def vkid_logout(params: VKIDSecondStepParams) -> None:
    """Clear auth cookies"""
    return None


app.include_router(router)
