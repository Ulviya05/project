
const BASE_URL = "http://127.0.0.1:5005"
const user_id = localStorage.getItem("id");

// if(!user_id) {
//     window.location.href = 'login.html';
// }
// else {
//     // Add a request interceptor
    
//     axios.interceptors.request.use(function (config) {
//         config.headers.Authorization = user_id;
//         // console.log(config)
//         return config;
//     });
    
// }

function login() {
    window.location.href = 'login.html';
}

function index() {
    window.location.href = 'index.html';
}

function create() {
    window.location.href = 'create.html';
}

function account() {
    window.location.href = 'account.html';
}

// const urlParams = new URL(window.location.toLocaleString()).searchParams;
// const reply_id = urlParams.get('reply_id') || "ALL";

function getReviews() {
    // loading(true);
    setTimeout(() => {
        axios.get(`${BASE_URL}/review/`)
        .then(function (response) {
            // loading(false);
            const { data } = response; 
            const reviews = data.reviews.map(el => {
                const review = makeReview(el);
                return review;    
            });
            document.getElementById("start").innerHTML = reviews.join("");
        })
        
    }, 500);
}
   

function makeReview(el) {
    if (el.deleted) {
        return `
            <div class="review" id="${el._id}">
                deleted
            </div>
        `
    }
    const top = `
        <div class="top">
            <div class="review_container" id="cont-${el._id}">
                <div class="review_text">
                    <p>${el.content}</p>
                </div>
            </div>
        </div>
    `;

    const bottom = `
        <div class="bottom">
            <div class="review_user">
                <div class="avatar">
                    <img src="${el.user.image}"
                        alt="${el.user.username}">
                </div>

                <div class="middle">
                    <p class="name">${el.user.username}</p>
                    <p class="time">${(new Date(el.createdAt)).toLocaleString()}</p>
                </div>

                <div class="rating">
                    ${el.score}
                </div>
            </div>
        </div>
    `;
    const review = `
        <div class="review" id="${el._id}">
            ${top}
            ${bottom}
        </div>
    `;
    return review;
}

if (_id === user_id) {
    
    $(`#${insights}`).after(`
    <div class="login_select selected">
    <button onclick="account()">ACCOUNT</button>
</div>
<div class="login_select">
    <button onclick="create()">CREATE INSIGHTS</button>
</div>
    `)
    

}


// function openReview(el) {
//     // if (el.deleted) {
//     //     return `
//     //         <div class="review" id="${el._id}">
//     //             deleted
//     //         </div>
//     //     `
//     // }
//     const  box_left = `
//         <div class="box_left">
//             <div class="review_container" id="cont-${el._id}">
//                 <div class="review_text">
//                     <p>${el.content}</p>
//                 </div>
//             </div>
//         </div>
//     `;

//     const box_right = `
//         <div class="box_right">
//             <div class="review_user">
//                 <div class="avatar">
//                     <img src="${el.user.image}"
//                         alt="${el.user.username}">
//                 </div>

//                 <div class="middle">
//                     <p class="name">${el.user.username}</p>
//                     <p class="time">${(new Date(el.createdAt)).toLocaleString()}</p>
//                 </div>

//                 <div class="rating">
//                     ${el.score}
//                 </div>
//             </div>
//         </div>
//     `;
//     const box = `
//         <div class="box" id="${el._id}">
//             ${box_left}
//             ${box_right}
//         </div>
//     `;
//     return box;
// }


function send() {
    axios.post(`${BASE_URL}/review`, {
        content: $("#text").val(),
        user_id: localStorage.getItem("id"),
        score: $("#rating").val()
    })
    .then(function (response) {
        const { data } = response; 
        getReviews()
    })
}

getReviews()


// function setParams(id) {
//     function updateURLParameter(url, param, paramVal){
//         var newAdditionalURL = "";
//         var tempArray = url.split("?");
//         var baseURL = tempArray[0];
//         var additionalURL = tempArray[1];
//         var temp = "";
//         if (additionalURL) {
//             tempArray = additionalURL.split("&");
//             for (var i=0; i<tempArray.length; i++){
//                 if(tempArray[i].split('=')[0] != param){
//                     newAdditionalURL += temp + tempArray[i];
//                     temp = "&";
//                 }
//             }
//         }
    
//         var rows_txt = temp + "" + param + "=" + paramVal;
//         return baseURL + "?" + newAdditionalURL + rows_txt;
//     }

//     var newURL = updateURLParameter(window.location.href, 'reply_id', id);
//     window.location = newURL;
// }



// function reply(id) {
//     axios.post(`${BASE_URL}/message/reply`, {
//         reply_content: $(`#text-${id}`).val(),
//         user_id:  localStorage.getItem("id"),
//         message_id: id,
//         type: $(`#${id}`).attr("data-type")
//     })
//     .then(function (response) {
//         console.log(response);
//         const { data } = response; 
//         getMessages()
//     })
// }


 

// function comment_cont(id) {
    
//     $(`#${id}`).after(`
//     <section id="comment_cont-${id}" class="comment_container">
//     <div class="avatar">
//     <img src=${ localStorage.getItem("image")}>
//     </div>
//     <div class="comment_text">
//         <textarea name="" id="text-${id}" cols="30" rows="5" placeholder="Add a comment..." ></textarea>
//     </div>
//     <div class="send">
//         <button type="button" onclick="reply('${id}')">REPLY</button>
//     </div>
//     </section>
//     `)

//     $(`#reply_icon-${id}`).addClass("disabled")
    
// }


// function edit_cont(id) {
    
//     $(`#cont-${id}`).html(`
    
//     <div class="comment_text" style="padding-left: 0">
//         <textarea name="" id="etext-${id}" cols="30" rows="5" placeholder="Add a comment...">${$(`#${id} .left .bottom .message_container .message_text p`).text()}</textarea>
//     </div>
   
//     <div class="send">
//         <button type="button" onclick="edit('${id}')">UPDATE</button>
//     </div>

//     `)

//     $(`#reply_icon-${id}`).after(`
//         <div class="trash_icon" onclick="delete_cont('${id}')"><i class="fa-solid fa-trash"></i></div>
//     `)

//     $(`#reply_icon-${id}`).html(``)
//     $(`#comment_cont-${id}`).remove();

//     $(`#edit_icon-${id}`).addClass("disabled")
// }

// function edit(id) {
//     axios.put(`${BASE_URL}/message//${$(`#${id}`).attr("data-type")}/${id}`, {
//         edited_content: $(`#etext-${id}`).val()
//     })
//     .then(function (response) {
//         console.log(response);
//         const { data } = response; ``
//         getMessages()
//     })
// }

// function delete_cont(id,type="message") {
//     $(`#${id}`).html(`
//         deleted
//     `)

//     axios.delete(`${BASE_URL}/message/${$(`#${id}`).attr("data-type")}/${id}`)
//     .then(function (response) {
//         console.log(response);
//         const { data } = response;
//         getMessages()
//     })

// }

// function loading(show) {
//     if(show) {
//         $(".loading").show();
//         $("body").css({"overflow": "hidden"})
//     }
//     else {
//         $(".loading").hide();
//         $("body").css({"overflow": "visible"})
//     }
// }

// $("#avatar_id").attr("src", localStorage.getItem("image"));

// getMessages();
