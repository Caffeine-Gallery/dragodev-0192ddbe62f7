import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Element {
  'id' : string,
  'styles' : Array<[string, string]>,
  'content' : string,
  'elementType' : string,
}
export type Website = Array<Element>;
export interface _SERVICE {
  'getWebsite' : ActorMethod<[bigint], [] | [Website]>,
  'getWebsites' : ActorMethod<[], Array<Website>>,
  'saveWebsite' : ActorMethod<[Website], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
