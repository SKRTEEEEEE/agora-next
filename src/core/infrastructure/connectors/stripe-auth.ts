import { SetEnvError } from "@/core/domain/flows/domain.error";
import Stripe from "stripe";

export abstract class StripeConnector {
    private _stripe: Stripe | null = null;
    private api = process.env.STRIPE_API_KEY;

    constructor(){
        // Only initialize if not in build time (when API is available)
        if (this.api) {
            this._stripe = this.initialize()
        }
    }
    private initialize(){
        if(!this.api) return null
        const stripe = new Stripe(this.api)
        return stripe
    }
    protected get stripe(){
        if (!this._stripe) {
            throw new SetEnvError("stripe api", StripeConnector)
        }
        return this._stripe
    }

}
