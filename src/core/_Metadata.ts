import {IFieldValidation, METADATA_NAMES} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType} from "./index";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "./_AbstractMetadata";
import { useEffect } from "react";


/** @internal **/
export class Metadata<T extends IFieldValidation> extends AbstractMetadata<T> {
    public defaultState = {} as any;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
       super(state, updateState, type);
    }

    public init(name: string, fieldType: FIELD_NAMES): void {
        this.name = name;
        this.fieldType = fieldType;
    }

    public update(value: any, validation: Array<IValidation>): void {
        let state: {[k: string]: IFieldValidation};
        if(!(this.name in this.state)){
            state = {
                ...this.state,
                [this.name]: {
                    name: this.name,
                    validation,
                    isTouched: false,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        currentValue: value,
                    },
                },
            };
            useEffect(() => {
                this.updateState(state);
            }, [state]);
        } else if(this.state[this.name] && value !== this.state[this.name].fieldValues.currentValue) {
            state = {
                ...this.state,
                [this.name]: {
                    name: this.name,
                    validation,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        currentValue: value,
                    },
                    isTouched: true,
                },
            };
            useEffect(() => {
                this.updateState(state);
            }, [state]);
        }
    }
}
