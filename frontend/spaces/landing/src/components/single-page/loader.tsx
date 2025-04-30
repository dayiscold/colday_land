import {SmokeScene} from "react-smoke";
import {useMemo} from "react";
import * as THREE from "three";

export const LoaderPage = () => {
    const smokeColor = useMemo(
        () => new THREE.Color("#5f5f5f"), []
    );

    return (
        <div
            style={{
                transition: "all .2s",
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                zIndex: 99999,
            }}
        >
            <SmokeScene
                smoke={{
                    color: smokeColor,
                    opacity: 0.3,
                    density: 50,
                    enableRotation: true,
                }}
            />
        </div>
    );
}
