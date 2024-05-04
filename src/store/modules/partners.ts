import * as API from '@/api/index'
import {
  IExposePartnerParams,
  IGetPendingBoostersParams,
  IInfinityPartnersParams,
  IPartners,
} from "@/interfaces/partners.interface";
import {
  ActionContext,
  Commit
} from "vuex";
import { Matrix } from "@/interfaces/store.interface";
import { useShowMessage } from "@/composables/useShowMessage";

export default {
  namespaced: true,
  state() {
    return {
      partnersExposed: {} as IPartners,
      partnersPending: {} as IPartners,
      newPartnersPending: {} as IPartners,
      infinityPartners: null as Matrix[] | null,
      countPendingBoosters: null,
      levelID: 1 as number,

      pageIdPartners: 1,
      activeLittleTabID: null,

      // Матрица партнёра
      partnersPendingSecond: {} as IPartners,
      infinityPartnersSecond: [] as Matrix[],
    }
  },
  actions: {
    getExposedPartners(
      { commit, rootState, state }: { commit: Commit; rootState: any; state: any },
      { filter, changeTab = false } : IGetPendingBoostersParams,
    ) {
      state.levelID = filter
      const matrixType = rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType?.type

      if (matrixType) {
        API.filterOfActivatedMatrix({
              matrixType,
              matrixFilterPageId: state.pageIdPartners,
              //@ts-ignore
              matrixFilterUserId: window.UserData.id,
              filter: { level: filter }
            }
        ).then(response => {
          if (response.data?.totalCount === 0 && rootState.bigTabID === 1 && changeTab) {
            commit('CHANGE_LITTLE_TAB', 1, { root: true })
            commit('SET_ACTIVE_LITTLE_TAB', 1)
          }

          commit('SET_EXPOSED_PARTNERS', response.data)
        })
      }
    },

    // Партнеры в ожидании для блока с табами
    getNewPendingPartners(
        { commit, rootState, state }: { commit: Commit; rootState: any; state: any },
        { filter, changeTab = false }: IGetPendingBoostersParams
    ) {
      state.levelID = filter
      const type = rootState.newTypeMatrix ? rootState.newTypeMatrix : rootState.selectedType?.type

      if (type) {
        API.filterOfActivatedMatrix({
              matrixType: type,
              matrixFilterPageId: state.pageIdPartners,
              //@ts-ignore
              matrixFilterUserId: window.UserData.id,
              filter: { pending: 1, level: filter }
            }
        ).then(response => {
          if (response.data?.totalCount === 0 && rootState.bigTabID === 1 && changeTab) {
            commit('CHANGE_LITTLE_TAB', 2, { root: true })
            commit('SET_ACTIVE_LITTLE_TAB', 2)
          }

          if (state.pageIdPartners === 1 && filter === 1 && type === rootState.selectedType?.type) {
            commit('SET_PENDING_PARTNERS', response.data)
          }

          commit('SET_NEW_PENDING_PARTNERS', response.data)
        })
      }
    },
    getPendingPartners(
      { commit, rootState }: { commit: Commit; rootState: any; state: any },
      {
        isPartnerMatrix = false,
        matrixType = rootState.selectedType?.type,
        matrixUUID,
        //@ts-ignore
        ownerID = window.UserData.id,
      }: IGetPendingBoostersParams
    ) {
      if (matrixType) {
        API.filterOfActivatedMatrix({
              matrixType,
              matrixFilterPageId: 1,
              matrixFilterUserId: ownerID,
              filter: { pending: 1 },
              matrixUUID,
            }
        ).then(response => {
          // Партнеры в ожидании Нашей матрицы
          if (!isPartnerMatrix) {
            commit('SET_PENDING_PARTNERS', response.data)
            // Партнеры в ожидании Матрицы партнера
          } else {
            commit('SET_PENDING_PARTNERS_SECOND', response.data)
          }
        })
      }
    },

    getInfinityPartners({ commit }: { commit: Commit }, { parentId, isPartnerMatrix = false }: IInfinityPartnersParams) {
      API.getListOfInfinity(parentId).then(response => {
        if (!isPartnerMatrix) {
          commit('SET_INFINITY_PARTNERS', response.data.list)
        } else {
          commit('SET_INFINITY_PARTNERS_SECOND', response.data.list)
        }
      })
    },
    async exposePartner(ctx: ActionContext<any, any>, data: IExposePartnerParams) {
      const notificationText = data?.notificationText
      delete data.notificationText
      const response = await API.placementExistingMatrix(data)
      console.log('exposePartner', response)
      if (response?.error_code === undefined) {
        useShowMessage('green', notificationText ?? 'Партнёр успешно отправлен на расстановку')
      }
      await ctx.dispatch('getMatrixByType', ctx.rootState.selectedType?.type, { root: true })

      return response
    },
  },
  mutations: {
    SET_EXPOSED_PARTNERS(state: any, partnersExposed: Object) {
      state.partnersExposed = partnersExposed
    },
    SET_PENDING_PARTNERS(state: any, partnersPending: Object) {
      state.partnersPending = partnersPending
    },
    SET_PENDING_PARTNERS_SECOND(state: any, partnersPending: Object) {
      state.partnersPendingSecond = partnersPending
    },
    SET_NEW_PENDING_PARTNERS(state: any, newPartnersPending: Object) {
      state.newPartnersPending = newPartnersPending
    },
    SET_INFINITY_PARTNERS(state: any, infinityPartners: any) {
      state.infinityPartners = infinityPartners
    },
    SET_INFINITY_PARTNERS_SECOND(state: any, infinityPartners: any) {
      state.infinityPartnersSecond = infinityPartners
    },
    SET_COUNT_PENDING_BOOSTERS(state: any, count: number) {
      state.countPendingBoosters = count
    },
    SET_PAGE_ID_PARTNERS(state: any, pageIdPartners: number) {
      state.pageIdPartners = pageIdPartners
    },
    SET_ACTIVE_LITTLE_TAB(state: any, id: number) {
      state.activeLittleTabID = id
    }
  },
  getters: {}
}