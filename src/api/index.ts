import { getAsync, postAsync, putAsync } from "./config";
import { IExposePartnerParams } from "@/interfaces/partners.interface";
import { IBuyBoosterParams } from "@/interfaces/store.interface";
import { ITeleportPartnerParams } from "@/interfaces/chains.interface";

export function setDataToLS(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLS(key: string) {
  const data: string | null = localStorage.getItem(key);

  return data && data !== "undefined" ? JSON.parse(data) : null;
}

// GET

export async function getListOfTypes(category: string) {
  return getAsync(`/api/matrix/list-of-types/${category}`);
}

export async function getMatrix(
  matrixTypeOrId: string | number,
  options?: any
) {
  return getAsync(`/api/matrix/${matrixTypeOrId}`, options);
}

export async function getMatrixByUUID(matrixUUID: string, options?: any) {
  return getAsync(`/api/matrix/uuid/${matrixUUID}`, options)
}

export async function getPaymentForm(matrixType: string) {
  return getAsync(`/api/matrix/payment-form/${matrixType}`);
}

export async function getListOfInfinity(parentId: number) {
  return getAsync(`/api/matrix/list-of-infinity/${parentId}`);
}

export async function getListOfChains(pageID: number) {
  return getAsync(`/api/matrix/chains/profit?page=${pageID}`);
}

export async function getListOfPartnersForTeleport(pageID: number) {
  return getAsync(`/api/matrix/teleport/list?page=${pageID}`);
}

export async function getChainDetail(uuid: string) {
  return getAsync(`/api/matrix/chain-details/${uuid}`);
}

export async function getBalance() {
  return getAsync("/api/wallet/balance");
}

// POST

export async function filterOfActivatedMatrix({
  matrixType,
  matrixFilterUserId,
  matrixFilterPageId,
  filter,
  matrixUUID,
}: any) {
  const matrixIdParam = `${matrixUUID ? `/${matrixUUID}` : ''}`

  return postAsync(
    `/api/matrix/get-clones/${matrixType}/${matrixFilterUserId}/${matrixFilterPageId}${matrixIdParam}`,
    { filter }
  );
}

export async function placementClone(data: IBuyBoosterParams) {
  return postAsync("/api/matrix/placement-clone", data);
}

export async function activatePartnerTeleport(data: ITeleportPartnerParams) {
  return postAsync("/api/matrix/teleport/activate", data);
}

export async function switchTeleport(enable: boolean) {
  return postAsync('/api/matrix/teleport/switch', { enable })
}

// PUT

export async function placementExistingMatrix(data: IExposePartnerParams) {
  return putAsync("/api/matrix/placement-existing-matrix", data);
}
