import {ReactElement, default as React, useContext, useEffect} from "react";
import {FormContext, IInputFieldMetadata, IMetadata, METADATA_NAMES} from "../form";

export interface IButton<T> {
    create(): (props: T) => ReactElement<T>;
}


abstract class Button<T> implements IButton<T> {

    public abstract create(): (props: T) => ReactElement<T>;

}

export interface ISubmitButtonProps {
    text?: string;
    disabled?: false;
    className?: string;
    children?: any;
}

/**
 * SubmitButton is the main component for submitting forms.
 *
 */
export class SubmitButton implements Button<ISubmitButtonProps> {

    create() {
       return (props: ISubmitButtonProps) => {
           // Context
           const context = useContext(FormContext);

           // Styles
           const { className = "btn btn-success btn-lg", disabled = true} = props;

           let isDisabled = false;
           const inputState = context.metadata.inputs.state;
           for (let meta of Object.keys(context.metadata)) {
               let metaField = context.metadata[meta as keyof IMetadata].state;
               // If all all fields are valid then pass through the default isDisabled value
               for(let field of Object.keys(metaField)) {
                   for(let validation of metaField[field].validation) {
                       if(!validation.isValid) {
                           isDisabled = true;
                       }
                   }
               }
           }

           return (<button
               disabled={isDisabled}
               className={className}
           >{props.children}</button>);
       }
    }
}
