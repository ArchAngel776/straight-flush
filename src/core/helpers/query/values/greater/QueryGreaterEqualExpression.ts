import { FilterOperators } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ValueofModel } from "@data/types/ValueofModel"

import QueryValueExpression from "@foundations/query/QueryValueExpression"


export type QueryGreaterEqualExpressionValue<Schema extends ModelSchema> = ValueofModel<Schema>

export default class QueryGreaterEqualExpression<Schema extends ModelSchema> extends QueryValueExpression<Schema, QueryGreaterEqualExpressionValue<Schema>>
{
    public getValue(): FilterOperators<ValueofModel<Schema>>
    {
        return { $gte: this.value }
    }
}