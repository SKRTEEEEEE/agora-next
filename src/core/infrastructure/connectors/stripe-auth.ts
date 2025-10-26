import { SetEnvError } from "@/core/domain/flows/domain.error";
import Stripe from "stripe";

export abstract class StripeConnector {
    private _stripe;
    private api = process.env.STRIPE_API_KEY;

    constructor(){
        this._stripe = this.initialize()
    }
    private initialize(){
        if(!this.api)throw new SetEnvError("stripe api", StripeConnector)
        const stripe = new Stripe(this.api)
        return stripe
    }
    protected get stripe(){
        return this._stripe
    }

}
