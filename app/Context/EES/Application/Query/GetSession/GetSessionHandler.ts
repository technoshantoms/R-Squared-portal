import GetSession from "./GetSession";
import Session from "../../../Domain/Deposit/Session";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import {UseCaseError} from "../../../../Core/Logic/AppError";
import {SessionNotFoundError} from "./Errors";
import EesRepository from "../../../Infrastructure/EES/Repository";

export default class GetSessionHandler {
    constructor(private _sessionRepository: SessionRepositoryInterface) {}

    async execute(query: GetSession): Promise<Result<UseCaseError, Session>> {
        const session = await this._sessionRepository.load(query.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(query.sessionId));
        }

        if (session.externalContract === null) {
            // This means that the session is being loaded from the EES service
            const eesRepository = new EesRepository();
            (
                await eesRepository.getDepositsStatuses([query.sessionId])
            ).forEach(({sessionId, status}) => {
                session.setStatus(status);
                this._sessionRepository.save(session);
            });
        }

        return Success.create(session);
    }
}
