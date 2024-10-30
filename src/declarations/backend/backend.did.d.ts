import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Element {
  'id' : string,
  'styles' : ElementStyle,
  'content' : string,
  'children' : Array<Element>,
  'elementType' : string,
}
export interface ElementStyle {
  'height' : string,
  'backgroundColor' : string,
  'borderRadius' : string,
  'textDecoration' : string,
  'fontStyle' : string,
  'flexDirection' : string,
  'justifyContent' : string,
  'color' : string,
  'alignItems' : string,
  'boxShadow' : string,
  'fontWeight' : string,
  'margin' : string,
  'textAlign' : string,
  'display' : string,
  'width' : string,
  'fontSize' : string,
  'padding' : string,
}
export interface Website {
  'fonts' : Array<string>,
  'theme' : string,
  'globalStyles' : { 'backgroundColor' : string, 'color' : string },
  'elements' : Array<Element>,
}
export interface _SERVICE {
  'getDefaultTemplate' : ActorMethod<[], Website>,
  'getWebsite' : ActorMethod<[bigint], [] | [Website]>,
  'getWebsites' : ActorMethod<[], Array<Website>>,
  'saveWebsite' : ActorMethod<[Website], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
