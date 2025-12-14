import type {friendLinkType} from "~/stores/type/index/friendLink";
import type {hotPassageType} from "~/stores/type/index/hotPassage";
import type {articleType} from "~/stores/type/index/article";
import type {hiroType} from "~/stores/type/index/hiro"

export interface index{
    hiro:hiroType
    hotPassage:hotPassageType,
    friendLink:friendLinkType[],
    article:articleType[]
}