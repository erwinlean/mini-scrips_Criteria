-- Convert if the sku is number to String, and add 0 at the front, to fix errors in the EasyCatalog team --

local var1 = field("var1")
local sku = tostring(var1)
local zero = "0"

function string.insert(skuToModify, zeroToAdd)
    if #skuToModify == 3 then
        return zeroToAdd .. skuToModify
    else
        return skuToModify
    end
end