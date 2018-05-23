( function( wp ) {
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 *
	 * RichText Renders a rich contenteditable input, providing users the option
	 * to add emphasis to content or links to content. It behaves similarly to a
	 * controlled component, except that onChange is triggered less frequently
	 * than would be expected from a traditional input field, usually when the
	 * user exits the field.
	 * @see https://github.com/WordPress/gutenberg/tree/master/editor/components/rich-text
	 */
	var registerBlockType = wp.blocks.registerBlockType,
		RichText = wp.editor.RichText;
	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://github.com/WordPress/gutenberg/tree/master/element#element
	 */
	var el = wp.element.createElement;
	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	var __ = wp.i18n.__;

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'learn-iron-code-block-rich-text-list/iron-code-rich-text-list', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Iron Code RichText List' ),

		/**
		 * Add dashicon icon in Gutenberg block selector.
		 * @see https://developer.wordpress.org/resource/dashicons/#welcome-learn-more
		 */
		icon: 'welcome-learn-more',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			/**
			 * Function to update "content" attribute.
			 */
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			/**
			 * Render our block for the editor as ul/li using our content
			 * attribute in a RichText component.
			 */
			return el(
				RichText,
				{
					tagName: 'ul',
					className: props.className,
					multiline: 'li',
					onChange: onChangeContent,
					value: props.attributes.content
				}
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		save: function( props ) {
			/**
			 * Render the markup using the RichText.Content component.
			 * This handles of logic of things like wrapping each element in
			 * props.attributes.content with an <li> and wrapping the entire
			 * thing with a <ul>.
			 */
			return el( RichText.Content, {
				tagName: 'ul',
				multiline: 'li',
				value: props.attributes.content
			} );
		}
	} );
} )(
	window.wp
);
