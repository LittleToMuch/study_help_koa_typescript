import { query } from "../utils/query";
import { Swiper, Slider } from '../utils/userType'

export const indexSwiper = async () => {
    const sql: string = `select * from swiper`
    const res: Swiper[] = await query(sql)
    return { code: 200, data: res }
}

export const indexSlider = async () => {
    const sql: string = `select * from slider`
    const res: Slider[] = await query(sql)
    return { code: 200, data: res }
}