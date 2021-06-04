export const EVM_REVERT = 'VM Exception while processing transaction: revert'

export const TOKENS_NAME = "Art"
export const TOKENS_SYMBOL = "ART"
export const CONTRACT_FEE_PERCENTAGE = 1
export const ARTIST_FEE_PERCENTAGE = 5
export const BASE_ART_PRICE = 2000
export const PARENT_MULTIPLIER_PERCENTAGE = 5
export const MIN_PARENTS = 1
export const MAX_PARENTS = 6
export const MIN_LEGACIES = 1
export const MAX_LEGACIES = 6
export const ARTIST_FEE_PERCENTAGE_NEW = 10
export const ARTIST_FEE_PERCENTAGE_LOW = 0
export const ARTIST_FEE_PERCENTAGE_HIGH = 1000
export const TOKEN_URI = 'asdf'
export const NAME = 'Andrew'
export const PARENT_IDS = [0]
export const PARENT_IDS_LOW = []
export const PARENT_IDS_HIGH = [0,1,2,3,4,5,6,7,8,9]
export const NUM_LEGACIES = 2
export const NUM_LEGACIES_LOW = 0
export const NUM_LEGACIES_HIGH = 100
export const GEN_1 = 1

export const ORDER_PRICE = BASE_ART_PRICE + (BASE_ART_PRICE * NUM_LEGACIES * PARENT_MULTIPLIER_PERCENTAGE * PARENT_IDS.length / 100)
export const CONTRACT_FEE = ORDER_PRICE * CONTRACT_FEE_PERCENTAGE / 100
export const TOTAL_PRICE = ORDER_PRICE + CONTRACT_FEE

export const SALE_PRICE = 1000
export const ARTIST_CUT = SALE_PRICE * ARTIST_FEE_PERCENTAGE / 100
export const CONTRACT_CUT = SALE_PRICE * CONTRACT_FEE_PERCENTAGE / 100
export const TOTAL_PURCHASE_PRICE = SALE_PRICE + ARTIST_CUT + CONTRACT_CUT