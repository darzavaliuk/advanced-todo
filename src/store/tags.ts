import {makeAutoObservable} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

class Tags {
    tags: string[] = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
        makePersistable(this, {
            name: 'TagsStore',
            properties: ['tags'],
            storage: window.localStorage,
        })
    }

    addTag(tag: string[]) {
        tag.forEach((tg) => {
            if (!this.tags.includes(tg)) {
                this.tags.push(tg);
            }
        })
    }
}

const tags = new Tags()
export default tags
