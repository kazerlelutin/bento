
import { createConfirmModal } from '../utils/createConfirmModal'


export const confirmDialog = {
  state: {
    confirm: false,
  },
  async onClick(state) {
    const dialog = createConfirmModal(state.text, state.subText, state.callback)
    dialog.showModal()
  },
}
