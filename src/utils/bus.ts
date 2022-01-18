import mitt from 'mitt'

type Events = {
  'form-item-created': any
}

const bus = mitt<Events>()

export default bus
