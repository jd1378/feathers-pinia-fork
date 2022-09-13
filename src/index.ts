export { setupFeathersPinia } from './setup'
export { defineStore } from './service-store/define-store'
export { defineAuthStore } from './define-auth-store'
export { makeServiceStore, BaseModel } from './service-store/index'
export { associateFind } from './associate-find'
export { associateGet } from './associate-get'
export { makeState } from './service-store/make-state'

export { models } from './models'
export { clients, registerClient } from './clients'

export { Find, useFind } from './use-find'
export { useFindWatched } from './use-find-watched'
export { useGet } from './use-get'
export { usePagination } from './use-pagination'
export { useClones } from './use-clones'
export { useClone } from './use-clone'

export { syncWithStorage } from './storage-sync'
export { clearStorage } from './clear-storage'

export * from './types'
export * from './service-store/types'
