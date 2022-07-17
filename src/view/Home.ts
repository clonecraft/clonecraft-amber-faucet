import { utils } from "ethers";
import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Config from "../Config";
import DiscordUserInfo from "../datamodel/DiscordUserInfo";

export default class Home implements View {

    private discordUser: DiscordUserInfo | undefined;

    private container: DomNode;
    private amountDisplay: DomNode;
    private amountInput: DomNode<HTMLInputElement>;

    constructor() {
        BodyNode.append(
            (this.container = el(".home-view",
                el("section",
                    el("header",
                        el("h1", "AMBER",),
                        el("p", "Faucet"),
                    ),
                    el("article",
                        el(".faucet-container",
                            el(".input-container",
                                el("label",
                                    el("p", "Amber"),
                                    el("span", "Amount"),
                                ),
                                this.amountInput = el("input", { placeholder: "Amount", value: "1" }),
                            ),
                            el(".image-container",
                                el("img", { src: "/images/faucet.png", alt: "faucet" }),
                            ),
                        ),
                        el(".amber-container",
                            el(".my-container",
                                el("p", "보유 엠버 : "),
                                this.amountDisplay = el("p.amber", "..."),
                            ),
                            el("a", "받기", {
                                click: async () => {
                                    if (this.discordUser !== undefined) {
                                        const result = await fetch(`${Config.apiURI}/test-amber-faucet-airdrop`, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                user: this.discordUser.id,
                                                amount: utils.parseEther(this.amountInput.domElement.value).toString()
                                            }),
                                        });
                                        if (result.ok) {
                                            alert("받기 완료");
                                            location.reload();
                                        } else {
                                            alert("오류 발생");
                                        }
                                    }
                                },
                            }),
                        ),
                    ),
                ),
            )),
        );
        this.load();
    }

    public set title(title: string) {
        document.title = `${title} Amber Faucet`;
    }

    private async load() {

        let code: string | undefined | null = new URLSearchParams(window.location.search).get("code")!;
        if (code !== null) {
            try {
                await fetch(`${Config.apiURI}/discord/token?${new URLSearchParams({
                    code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}`,
                })}`);
            } catch (error) {
                console.error(error);
                code = undefined;
            }
        } else {
            code = undefined;
        }

        if (code !== undefined) {
            try {
                const result = await fetch(`${Config.apiURI}/discord/me?${new URLSearchParams({
                    code,
                })}`);
                this.discordUser = await result.json();

                const result2 = await fetch(`${Config.apiURI}/amber/balance/discord/${this.discordUser!.id}`);

                this.amountDisplay.empty().appendText(utils.formatEther(await result2.text()));

            } catch (error) {
                console.error(error);
            }
        }

        else {
            location.href = `https://discord.com/api/oauth2/authorize?client_id=${Config.applicationId}&redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}`)}&response_type=code&scope=identify`;
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}