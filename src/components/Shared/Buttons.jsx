import React from "react";
import { Button } from "reactstrap";
export const LoadingButton = (props) => {
    const { isLoading, type, color, onClick, className, isDisabled } = props;
    let opacity = 0;
    if (isLoading) {
        opacity = 0;
    } else if (isDisabled) {
        opacity = 0;
    } else {
        opacity = 1;
    }
    return (
        <Button
            type={type || "button"}
            color={color || "primary"}
            onClick={onClick && onClick}
            className={`d-flex justify-content-center ${className}`}
            disabled={isLoading || isDisabled}
        >
            <span style={{ opacity: isDisabled ? 1 : (isLoading ? 0 : 1) }}>{props.children}</span>
            <span
                style={{
                    opacity: isDisabled ? 0 : (isLoading ? 1 : 0),
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <svg style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }} width="200px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="84" cy="50" r="10" fill="rgba(255, 255, 255, 0.3)">
                        <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                        <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="rgba(255, 255, 255, 0.3);rgba(255, 255, 255, 0.9);rgba(255, 255, 255, 0.7);rgba(255, 255, 255, 0.5);rgba(255, 255, 255, 0.3)" begin="0s"></animate>
                    </circle><circle cx="16" cy="50" r="10" fill="rgba(255, 255, 255, 0.3)">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                    </circle><circle cx="50" cy="50" r="10" fill="rgba(255, 255, 255, 0.5)">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                    </circle><circle cx="84" cy="50" r="10" fill="rgba(255, 255, 255, 0.7)">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                    </circle><circle cx="16" cy="50" r="10" fill="rgba(255, 255, 255, 0.9)">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                    </circle>
                </svg>
            </span>
        </Button>
    );
};