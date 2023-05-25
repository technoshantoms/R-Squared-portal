import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Notification} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import UnlockButton from "../../../UnlockButton/UnlockButton";
import CheckWithdrawContractReadyToSign from "../../../../Context/EES/Application/Command/CheckWithdrawContractReadyToSign/CheckWithdrawContractReadyToSign";
import CheckWithdrawContractReadyToSignHandler from "../../../../Context/EES/Application/Command/CheckWithdrawContractReadyToSign/CheckWithdrawContractReadyToSignHandler";

type Params = {
    sessionId: string;
    refresh: () => void;
};

function CheckWithdrawContractReadyToSignButton({sessionId, refresh}: Params) {
    async function onClick() {
        const query = new CheckWithdrawContractReadyToSign(sessionId);
        const handler = await CheckWithdrawContractReadyToSignHandler.create();
        const result = await handler.execute(query);

        if (result) {
            refresh();
        } else {
            Notification.error({
                message: counterpart.translate(
                    "withdraw.session.errors.contract_not_found"
                )
            });
        }
    }

    return (
        <UnlockButton>
            <a className="button" onClick={onClick}>
                <Translate content="withdraw.session.actions.check_withdraw_contract_ready_to_sign" />
            </a>
        </UnlockButton>
    );
}

export default CheckWithdrawContractReadyToSignButton;
