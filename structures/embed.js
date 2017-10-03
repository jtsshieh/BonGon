class Embed {
    constructor(fields = []) {
        this.title = '';
        this.author = {};
        this.description = '';
        this.color = 0x00afff;
        this.fields = fields;
        this.footer = {};
    }
    /**
     * Adds a field to the embed
     * @param {String} name Name of Field
     * @param {String} value Value of Field
     * @param {boolean} [inline=false] Inline Property of the Field
     * @returns {Object}
     */
    addField(name, value, inline = true) {
        if (this.fields.length >= 25) throw new Error('EMBED_FIELD_COUNT');
        if (!String(name) || name.length > 256) throw new Error('EMBED_FIELD_NAME');
        if (!String(value) || value.length > 1024) throw new Error('EMBED_FIELD_VALUE');
        this.fields.push({
            name,
            value,
            inline
        });
        return this;
    }
    /**
     * Sets the author of the embed.
     * @param {String} name The name of the author
     * @param {String} [iconURL] The icon URL of the author
     * @param {String} [url] The URL of the author
     * @returns {Object}
     */
    setAuthor(name, iconURL, url) {
        this.author = {
            name: name,
            icon_url: iconURL,
            url
        };
        return this;
    }

    /**
     * Sets the color of the embed.
     * @param {Color} color The color of the embed
     * @returns {Object}
     */
    setColor(color) {
        this.color = color;
        return this;
    }

    /**
     * Sets the description of the embed.
     * @param {StringResolvable} description The description
     * @returns {Object}
     */
    setDescription(description) {
        if (description.length > 2048) throw new Error('EMBED_DESCRIPTION');
        this.description = description;
        return this;
    }

    /**
     * Sets the footer of the embed.
     * @param {String} text The text of the footer
     * @param {String} [iconURL] The icon URL of the footer
     * @returns {Object}
     */
    setFooter(text, iconURL) {
        if (text.length > 2048) throw new Error('EMBED_FOOTER_TEXT');
        this.footer = {
            text,
            iconURL
        };
        return this;
    }

    /**
     * Set the image of the embed.
     * @param {String} url The URL of the image
     * @returns {Object}
     */
    setImage(url) {
        this.image = {
            url
        };
        return this;
    }

    /**
     * Set the thumbnail of the embed.
     * @param {String} url The URL of the thumbnail
     * @returns {Object}
     */
    setThumbnail(url) {
        this.thumbnail = {
            url
        };
        return this;
    }

    /**
     * Sets the timestamp of the embed.
     * @param {Date} [timestamp=current date] The timestamp
     * @returns {Object}
     */
    setTimestamp(timestamp = new Date) {
        this.timestamp = timestamp;
        return this;
    }

    /**
     * Sets the title of the embed.
     * @param {String} title The title
     * @returns {Object}
     */
    setTitle(title) {
        if (title.length > 256) throw new Error('EMBED_TITLE');
        this.title = title;
        return this;
    }

    /**
     * Sets the URL of the embed.
     * @param {string} url The URL
     * @returns {Object}
     */
    setURL(url) {
        this.url = url;
        return this;
    }
}
module.exports = Embed;
