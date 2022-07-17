import { DomNode, el, msg, Popup } from "skydapp-browser";
import Klip from "../../klaytn/Klip";

export default class ConnectWalletPopup extends Popup {

    public content: DomNode;

    constructor(callback: () => void) {
        super(".popup-background");
        this.append(
            this.content = el(".connect-wallet-popup",
                el(".left-container",
                    el("p", "IMAGE"),
                ),
                el(".right-container",
                    el(".cancel-container", { click: () => this.delete(), },
                        el("img", { src: "/images/icn/close.svg", alt: "close" }),
                    ),
                    el("header",
                        el("h6", "Connect Wallet"),
                        el("p", "KLUBS는 블록체인지갑과의 연결이 필요합니다. 카이카스 혹은 카카오톡 클립에서 연결해주시기 바랍니다."),
                    ),
                    el("hr"),
                    el(".button-container",
                        el("a.kaikas-button", { href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi" },
                            el("img", { src: "/images/icn/kaikas.svg", alt: "kaikas" }),
                            el("p", "카이카스"),
                        ),
                        el("a.klip-button", {
                            click: async () => {
                                await Klip.connect();
                                callback();
                                this.delete();
                            },
                        },
                            el("img", { src: "/images/icn/klip.svg", alt: "klip" }),
                            el("p", "카카오클립"),
                        ),
                        el("a.cancel-button", { click: () => this.delete(), },
                            el("p", "연결하지않고 둘러보기"),
                        ),
                    ),
                ),
            ),
        );
    }
}