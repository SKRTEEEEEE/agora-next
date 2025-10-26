"use client"

import { generatePayload, getUserData, isLoggedIn, login } from "@/actions/auth"
import { rd } from "@/actions/revrd";
import { ConnectButton } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { ThirdwebClientConfig } from "@/core/infrastructure/connectors/thirdweb-auth";
import { useEffect, useState } from "react";
import UserFormDialog from "./site-header/user-form-dialog";

const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "discord",
          "telegram",
          "email",
          "facebook",
          "passkey",
          "phone",
          "apple",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.hashpack.wallet"),
    createWallet("org.uniswap"),
    createWallet("com.okex.wallet"),
    createWallet("ai.hacken"),
    createWallet("com.trusteeglobal"),
    createWallet("com.thirdweb"),
    createWallet("com.coinsdo"),
    createWallet("us.binance"),
    createWallet("dev.auroracloud"),
    createWallet("zone.bitverse"),
    createWallet("co.xellar"),
    createWallet("app.subwallet"),
    createWallet("com.kraken"),
    createWallet("com.alphawallet"),
    createWallet("org.mathwallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.trustwallet.app"),
    createWallet("com.ledger"),
    createWallet("com.bybit"),
    createWallet("com.safepal"),
    createWallet("pro.tokenpocket"),
    createWallet("xyz.timelesswallet"),
    createWallet("global.safe"),
    createWallet("io.1inch.wallet"),
    createWallet("com.robinhood.wallet"),
    createWallet("com.crypto.wallet"),
    createWallet("com.exodus"),
    createWallet("im.token"),
    createWallet("com.zengo"),
    createWallet("com.mewwallet"),
    createWallet("app.keyring"),
    createWallet("xyz.frontier.wallet"),
    createWallet("app.omni"),
    createWallet("app.onto"),
    createWallet("com.fireblocks"),
    createWallet("technology.obvious"),
    createWallet("com.ambire"),
    createWallet("com.bitcoin"),
    createWallet("io.internetmoney"),
    createWallet("app.walletnow"),
    createWallet("com.mtpelerin"),
  ];

const getClient = new ThirdwebClientConfig()
const client = getClient.client


type User = {
  id: string;
  nick: string | null;
  img: string | null;
  email: string | null;
  address: string;
  role: string | null;
}

export const CustomConnectButton = ({connectButtonLabel="Iniciar sesión"}:{connectButtonLabel?:string}) =>{
    const [img, setImg] = useState<string|undefined>(undefined)
    const [user, setUser] = useState<User | null>(null)
    const [isLogged, setIsLogged] = useState(false)

    const loadUserData = async () => {
      const logged = await isLoggedIn()
      setIsLogged(logged)
      if (logged) {
        const userData = await getUserData()
        if (userData) {
          setUser(userData)
          setImg(userData.img || undefined)
        }
      }
    }

    useEffect(() => {
      loadUserData()
    }, [])

    return(
      <div suppressHydrationWarning className="flex gap-2 items-center">
        {isLogged && user && (
          <UserFormDialog 
            user={user}
            buttonLabelVariant="ghost"
            buttonLabelClass="w-10 px-0"
            onUserUpdate={loadUserData}
          />
        )}
        <ConnectButton
        client={client}
        wallets={wallets}
        connectModal={{
            size: "compact",
            showThirdwebBranding: false,
          }}
        locale={"es_ES"}
        detailsModal={{
            footer: () => <div className="w-full text-2xl"><p>SKRT👾</p></div>,
            hideSwitchWallet: true,
            hideDisconnect: false,
            connectedAccountAvatarUrl: img
        }}
        connectButton={{ 
          label: connectButtonLabel, 
          style:{
            height:  "2.25rem",
            width: "100%",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
            lineHeight:  "1.25rem",
          }, 
          className: "bg-background hover:shadow-xl hover:shadow-primary h-9 px-4 py-2 " 
        }}
        detailsButton={{
          render: () => (
            <Button variant={"outline"} className="w-full px-2">
              <Wallet width={20} height={20} />
              <span className="inline-block sm:hidden px-2">Tu cartera</span>
              <p className="hidden sm:sr-only">Configuración de tu cartera</p>
            </Button>
          ),
        }}
        auth={{
            isLoggedIn: async (address:string )=> {
                console.info("check if logged in: ", {address})
                return await isLoggedIn()
            },
            doLogin: async (params) => {
                console.info("logging in!")
                await login(params)
                // Obtener datos completos del usuario
                const userData = await getUserData()
                if (userData) {
                  setUser(userData)
                  setImg(userData.img || undefined)
                  setIsLogged(true)
                }
                rd("/")
            },
            getLoginPayload: async ({address}) => generatePayload({address}),
            doLogout:async () => {
              await fetch('/api/logout', { method: 'GET' });
              setIsLogged(false)
              setUser(null)
          }
        }}
        />
      </div>
    )
}
