
const templateCarousel = (todos) => {
    let c = {
        "type": "template",
        "altText": "待辦事項清單",
        "template": {
            "type": "carousel",
            "columns": todos,
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    }
    return c
}

const carousel = (todos) => {
    let arr = []
    todos.forEach((item, index) => {
        if (item.complete != "true") {
            arr.push({
                "thumbnailImageUrl": `https://source.unsplash.com/1600x900/?memo,note?${Math.random()}`,
                "imageBackgroundColor": "#FFFFFF",
                "title": `${item.title}`,
                "text": `${item.content}`,
                "defaultAction": {
                    "type": "uri",
                    "label": "前往網頁版",
                    "uri": "https://final-workshop-c110156107.vercel.app/"
                },
                "actions": [
                    {
                        "type": "message",
                        "label": "刪除",
                        "text": `確定刪除 ${item.id}`
                    },
                    {
                        "type": "message",
                        "label": "標記為完成",
                        "text": `標記為完成 ${item.id}`
                    },
                    {
                        "type": "uri",
                        "label": "前往網頁版",
                        "uri": "https://final-workshop-c110156107.vercel.app/"
                    }
                ]
            })
        }

    });
    return templateCarousel(arr)
}


export { carousel }