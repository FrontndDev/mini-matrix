import * as API from "@/api/index";
import { ActionContext, Commit } from "vuex";
import {
  IChainDetails,
  IChainsList,
  ITeleportList,
  ITeleportPartnerParams,
  ITeleports,
} from "@/interfaces/chains.interface";
import { useShowMessage } from "@/composables/useShowMessage";

export default {
  namespaced: true,
  state() {
    return {
      chainsList: {} as IChainsList,
      teleportList: {} as ITeleportList,
      chainDetails: {} as IChainDetails,
      pageIdChains: 1,
      activeLittleTabID: null
    };
  },
  actions: {
    getChainsList({ commit, state }: { commit: Commit; state: any }) {
      API.getListOfChains(state.pageIdChains).then((response) => {
        commit("SET_CHAINS_LIST", response.data);
      });
    },
    getTeleportList({ commit, state }: { commit: Commit; state: any }) {
      API.getListOfPartnersForTeleport(state.pageIdChains).then((response) => {
        commit("SET_TELEPORT_LIST", response.data);
      });
    },
    getChainDetail({ commit }: { commit: Commit }, id: string) {
      API.getChainDetail(id).then((response) => {
        commit("SET_CHAIN_DETAIL", response.data);
      });
    },
    teleportPartner(
      { state }: ActionContext<any, any>,
      data: ITeleportPartnerParams
    ) {
      API.activatePartnerTeleport(data).then((response) => {
        if (response?.error_code === undefined) {
          useShowMessage("green", "Телепорт успешно активирован");
          const index = state.teleportList.list
            .map((chain: ITeleports) => chain.owner.id)
            .indexOf(data.partnerId);
          state.teleportList.list.splice(index, 1);
          state.teleportList.totalCount--;
        }
      });
    },
  },
  mutations: {
    SET_CHAINS_LIST(state: any, chainsList: any) {
      state.chainsList = chainsList;
    },
    SET_TELEPORT_LIST(state: any, teleportList: any) {
      state.teleportList = teleportList;
    },
    SET_CHAIN_DETAIL(state: any, chainDetails: any) {
      state.chainDetails = chainDetails;
    },
    SET_PAGE_ID_CHAINS(state: any, pageIdChains: number) {
      state.pageIdChains = pageIdChains;
    },
    SET_ACTIVE_LITTLE_TAB(state: any, id: number) {
      state.activeLittleTabID = id
    }
  },
};
