// # General Description 
  
//  - Dantzig joins all Slack channel 
//  His keyboard is broken, he can only mention @channel 
//  - Given a map of channel name and its member’s ID, e.g. {"general": [2, 3, 4], "infra": [3, 5], "humor": [4, 6]} 
//  - The member's ID may not be sorted 
  
//  ## Level 1 
//  - Dantzig wants to notify person X and also minimize noise to other persons in that room 
//  - Which room should Dantzig go to?
  
//  ## Level 2 
//  - Dantzig notices that some channels contains exactly the same members, he wish to merged those channels. 
//  - Help Dantzig to recognize those channels, return list of list (output order doesn’t matter)
// Example:
//    input: {"general": [2, 3, 4], "infra": [3, 5], "humor": [4, 6]} 
//  output: {"general": [2, 3, 4], "infra": [3, 5], "humor": [4, 6]} 
//    input: {"general": [3, 5], "infra": [3, 5], "humor": [4, 6]} 
//  output: {"general-infral": [3, 5], "humor": [4, 6]}

// lv1
const data = {
    "general":[2,3,4],
    "infra":[3,5],
    "humor":[5,3]
}

const cariData = (id) => {
    const datas = []
    Object.keys(data).forEach(x => {
        if (data[x].includes(id)) datas.push({name: x, id: data[x]})
    })

    const sorted = datas.sort((a, b) => a.id.length - b.id.length)
    return sorted.length == 0 ? "null" : sorted[0].name
}

const mergeChannel = () => {
    let result = []
    const newData = []

    Object.keys(data).forEach(x => {
        newData.push({name: x, id: data[x].sort((a, b) => a - b)})
    })

    newData.forEach(x => {
        if (result.length === 0) {
            result.push({name: x.name, id: x.id})
            return
        }

        const kembar = result.filter(xx => xx.id === x.id)
        if (kembar.length === 0) {
            result.push({name: x.name, id: x.id})
            return
        }

        let key = kembar[0].name
        result = result.filter(xxx => xxx.id !== x.id)
        result.push({name: `${key}-${x.name}`, id: x.id})
    })

    return result
}

console.log(cariData(2))