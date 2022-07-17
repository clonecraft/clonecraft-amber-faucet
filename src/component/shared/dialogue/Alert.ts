import { DomNode, el, msg, Popup } from "skydapp-browser";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(
        title: string,
        message: string,
        confirmTitle?: string,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.alert",
                el(".close-container", { click: () => { this.delete() } },
                    el("img", { src: "/images/icn/close.svg", alt: "close" }),
                ),
                el(".content",
                    el("h6", title),
                    el("p", message),
                ),
                el(".button-container",
                    el("button", confirmTitle === undefined ? msg("CONFIRM_BUTTON") : confirmTitle, {
                        click: () => this.delete(),
                    }),
                ),
            ),
        );
    }
}
