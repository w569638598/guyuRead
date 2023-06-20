import fetch from "../../helper/ajax";

export function getBookList(params){
    return fetch.get('/books/booklist', params)
}


export function getBookDetail(book_id){
    return fetch.get('/books/getbook', {
        book_id: book_id
    })
}
// 分页拉去章节列表
export function getBookChapters(params){
    return fetch.get('/books/chapters',params )
}

export function getChapterContent(params){
    return fetch.get('/books/chapterContent',params )
}

