/*   Seperating columns with colon, to obtein new columns and use in EC   */

local var1 = field("var1"); /* VAR1 in this case is "MED:25" so, VAR1="MED:25" */
local parts = {}

for part in string.gmatch(var1, "[^:]+") do
    table.insert(parts, part)
end

/* return parts [1] or [2] will obtein string in the first part of the object(in this case "MED") separator is ":" and the second part should be ("25kg")*/
return parts[1]