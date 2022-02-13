import { DefineStoreOptionsBase, StateTree, Store, StoreDefinition, _GettersTree } from 'pinia';
import { AnyData, DefaultServiceStore, ServiceStoreDefaultActions, ServiceStoreDefaultGetters, ServiceStoreDefaultState, ServiceStoreSharedStateDefineOptions } from './service-store/types'
import { Application as FeathersClient } from '@feathersjs/feathers'
import { BaseModel, InstanceModifierOptions } from './service-store/base-model';
import { TypedActions, TypedGetters } from './utility-types';
import { Class, SetOptional } from 'type-fest';

export interface Filters {
  $sort?: { [prop: string]: -1 | 1 }
  $limit?: number
  $skip?: number
  $select?: string[]
}
export interface Query extends Filters, AnyData {}

export interface PaginationOptions {
  default?: number | true
  max?: number
}

export interface Params extends AnyData {
  query?: Query
  paginate?: boolean | PaginationOptions
  provider?: string
  route?: Record<string, string>
  headers?: Record<string, any>
  temps?: boolean
  copies?: boolean
  qid?: string
  skipRequestIfExists?: boolean
  data?: any
  preserveSsr?: boolean
}
export interface Paginated<T> {
  total: number
  limit: number
  skip: number
  data: T[]
}

export interface QueryInfo {
  qid: string
  query: Query
  queryId: string
  queryParams: Query
  pageParams: { $limit: number; $skip: number | undefined } | undefined
  pageId: string | undefined
  response: Paginated<any[]> | undefined
  isOutdated: boolean | undefined
}

export type HandledEvents = 'created' | 'patched' | 'updated' | 'removed'
export type HandleEventsFunction<
  M extends BaseModel = BaseModel
>  = (item: any, ctx: { model: Class<M>, models: any }) => any

export type HandleEvents<
  M extends BaseModel = BaseModel
> = {
  [event in HandledEvents]: HandleEventsFunction<M>
}

export interface DefineStoreOptionsWithDefaults<
  Id extends string,
  S extends StateTree,
  G /* extends GettersTree<S> */,
  A /* extends Record<string, StoreAction> */,
  DefaultS,
  DefaultG,
  DefaultA
> extends DefineStoreOptionsBase<S, Store<Id, S, G, A>> {
  state?: () => S

  getters?: TypedGetters<S, G, DefaultS, DefaultG>
 
  actions?: TypedActions<
    S, 
    G, 
    A,
    DefaultS,
    DefaultG,
    DefaultA
  >
}

export type DefineFeathersStoreOptions<
  Id extends string = any,
  M extends BaseModel = BaseModel,
  S extends StateTree = {}, 
  G extends _GettersTree<S> = {}, 
  A = {}
> = SetOptional<ServiceStoreSharedStateDefineOptions, 
  'idField' | 
  'clientAlias' | 
  'paramsForServer' |
  'whitelist' | 
  'skipRequestIfExists'
> & {
  ssr?: boolean
  servicePath: string
  Model?: typeof BaseModel
  id?: Id
  clients?: { [alias: string]: FeathersClient }
  enableEvents?: boolean
  handleEvents?: HandleEvents<M>
  debounceEventsTime?: number
  debounceEventsMaxWait?: number
  state?: () => S
  getters?: G
  actions?: A
}

export type DefineFeathersStoreDefaultOptions<
  Id extends string = any,
  M extends BaseModel = BaseModel,
  S extends StateTree = {}, 
  G extends _GettersTree<S> = {}, 
  A = {}
> =
  Omit<Required<DefineFeathersStoreOptions<Id, M, S, G, A>>, 'id' | 'Model'>

export type ServiceStoreDefinition<
  Id extends string,
  M extends BaseModel,
  S, 
  G, 
  A
> = StoreDefinition<
  Id, 
  ServiceStoreDefaultState<M> & S, 
  ServiceStoreDefaultGetters<M> & G, 
  ServiceStoreDefaultActions<M> & A
>