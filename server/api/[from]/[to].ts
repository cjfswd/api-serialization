import { options, IOption } from '../../../shared/utils'
import parserblade from 'parserblade'
import yamlifyObject from 'yamlify-object'

export default defineEventHandler(async (event) => {

    let success = []
    let error = []
    let response = ''

    if (options.some(item => item.includes(event.context.params.from)) && options.some(item => item.includes(event.context.params.to))) {
        success.push(`[api][serializable][success] params 'from' and 'to' has the correct type`)
    } else {
        error.push(`[api][serializable][error] params 'from' and 'to' should be typeof json | yaml | xml | csv`)
    }
    if (event.context.params.from != event.context.params.to) {
        success.push(`[api][serializable][success] values from params 'from' and 'to' is different`)
    } else {
        error.push(`[api][serializable][error] value from params should be different`)
    }
    if (event.req.method == 'POST' && error.length < 2) {
        const body = await useBody(event)
        console.log(body)
        let bodyParse

        if (event.context.params.from != 'json') {
            bodyParse = parserblade[event.context.params.from].parse(body)
        } else {
            bodyParse = body
        }
        if (event.context.params.to == 'yaml') {
            response = yamlifyObject(bodyParse)
        } else {
            response = parserblade[event.context.params.to].stringify(bodyParse)
        }
    } else {
        error.push(`[api][serializable][error] method ${event.req.method} not allowed`)
    }
    return { success, error, response }
})