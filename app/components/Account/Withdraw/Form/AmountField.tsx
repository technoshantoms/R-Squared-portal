import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, InputNumber, Tooltip, Icon} from "bitshares-ui-style-guide";
import {ValidationRule} from "antd/lib/form/Form";

interface Props {
    form: any;
    amount: number;
    minAmount: number;
    onChange: (amount: number) => void;
    validateCallback?: (value: number) => void;
    step?: number;
}

export default function AmountField({
    form,
    amount,
    minAmount,
    onChange,
    validateCallback,
    step
}: Props) {
    const {getFieldDecorator} = form;

    if (!step) {
        step = 0.01;
    }

    function onChangeHandler(amount: number) {
        const MAX_DECIMALS = 5;
        amount = fixDecimals(amount, MAX_DECIMALS);
        function fixDecimals(number: number, decimalPlaces: number) {
            // Check if the input is a valid number
            if (typeof number !== "number" || isNaN(number)) {
                throw new Error("The first argument must be a valid number.");
            }

            // Check if decimalPlaces is a valid non-negative integer
            if (
                typeof decimalPlaces !== "number" ||
                decimalPlaces < 0 ||
                !Number.isInteger(decimalPlaces)
            ) {
                throw new Error(
                    "Decimal places must be a non-negative integer."
                );
            }
            // Convert the number to a fixed decimal string
            const fixedNumber = number.toFixed(decimalPlaces);

            // Parse it back to a number to avoid returning a string
            return parseFloat(fixedNumber);
        }

        onChange(amount);
    }

    const label = <>{counterpart.translate("deposit.form.amount.label")}</>;

    const rules: ValidationRule[] = [
        {
            required: true,
            message: "Please fill deposit amount!"
        }
    ];

    if (validateCallback) {
        rules.push({
            validator: validateCallback
        });
    }

    return (
        <Form.Item label={label}>
            {getFieldDecorator("amount", {
                initialValue: amount,
                rules: rules
            })(
                <InputNumber
                    min={minAmount}
                    step={step}
                    onChange={onChangeHandler}
                />
            )}
            <span className="ant-form-text">ETH</span>
        </Form.Item>
    );
}
