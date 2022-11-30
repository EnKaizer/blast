import React from "react";
import { LoaderContainer } from "./LoaderContainer";

export const Loader = () => (
    <LoaderContainer>
        <h1>
            Getting Notes From CrocoBot...
        </h1>
        <img style={{width: '50%'}} src="https://chewedup.blast.tv/images/bot-eating.png" alt="crocobot_eating_notes"/>
    </LoaderContainer>
)