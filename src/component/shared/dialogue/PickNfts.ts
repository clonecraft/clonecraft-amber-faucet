import { DomNode, el, Popup } from "skydapp-browser";

export default class PickNfts extends Popup {

    public content: DomNode;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: () => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.pick-nfts",
                el(".content",
                    el("h6", title),
                    el("p", message),
                ),
                el(".nfts-list",
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                    el("img", { src: "/images/img/mock.png", alt: "nft", click: () => { this.delete() } }),
                ),
                el(".button-container",
                    el("button", "CANCEL", {
                        click: () => this.delete(),
                    }),
                    el("button", confirmTitle, {
                        click: () => {
                            confirm();
                            this.delete();
                        },
                    }),
                ),
            ),
        );
    }
}
