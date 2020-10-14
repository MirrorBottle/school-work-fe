import React from "react";
import FadeIn from "react-fade-in";
import Header from "../Headers/Header";

const withFadeIn = (
    Component,
    ComponentHeader = () => <Header />
) =>
    class WithFadeIn extends React.Component {
        render() {
            const { fadeInDelay, ...props } = this.props;
            return (
                <React.Fragment>
                    <ComponentHeader />
                    <FadeIn transitionDuration={200} delay={fadeInDelay || 50}>
                        <Component {...props} />
                    </FadeIn>
                </React.Fragment>
            );
        }
    };
export default withFadeIn;
