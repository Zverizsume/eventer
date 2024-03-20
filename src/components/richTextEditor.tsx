"use client"

import { useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

export default function RichTextEditor() {

	const [content, setContent] = useState('');

    // useEffect(() => {

    //     console.log('Content changed: ', content)

    // },[content])

	const editorConfiguration = {
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	};

    return(

		<CKEditor
			editor={ Editor }
			config={ editorConfiguration }
			data={ content }
			onChange={ (event, editor ) => {
				const data = editor.getData();
				setContent(data);
			} }
		/>

    )

}