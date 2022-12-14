import { Validators } from "../../core/data/interfaces/Validators"
import Validation, { ValidationData } from "../../core/foundations/Validation"
import merge from "../../core/hooks/merge"
import MaxValidator from "./string/MaxValidator"
import MinValidator from "./string/MinValidator"
import LengthValidator from "./string/LengthValidator"
import PatternValidator from "./string/PatternValidator"
import BaseModel from "../../core/foundations/BaseModel"

export interface StringValidationData extends ValidationData
{
    min: number
    max: number
    length: number
    pattern: RegExp
}

export default class StringValidation<Schema> extends Validation<Schema, StringValidationData>
{
    public validators(): Validators<Schema, StringValidationData>
    {
        return merge(super.validators(), {
            min: MinValidator,
            max: MaxValidator,
            length: LengthValidator,
            pattern: PatternValidator
        })
    }

    public isValid(model: BaseModel<Schema>, attribute: keyof Schema): boolean
    {
        return typeof model.attributes[attribute] === "string"
    }

    public getErrorMessage(): string
    {
        return "Property {attribute} must be a string"
    }
}