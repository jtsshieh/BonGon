class Embed {
  constructor(fields = []) {
    this.title = '';
    this.author = {};
    this.description = '';
    this.color = 0x00afff;
    this.fields = fields;
    this.footer = {};
  }
  addField(name = '', value = '', inline = true) {
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

  setAuthor(name, iconURL, url) {
    this.author = {
      name: name,
      icon_url: iconURL,
      url
    };
    return this;
  }
  setColor(color) {
    this.color = color;
    return this;
  }

  setDescription(description) {
    if (description.length > 2048) throw new Error('EMBED_DESCRIPTION');
    this.description = description;
    return this;
  }

  setFooter(text, iconURL) {
    if (text.length > 2048) throw new Error('EMBED_FOOTER_TEXT');
    this.footer = {
      text,
      iconURL
    };
    return this;
  }

  setImage(url) {
    this.image = {
      url
    };
    return this;
  }

  setThumbnail(url) {
    this.thumbnail = {
      url
    };
    return this;
  }

  setTimestamp(timestamp = new Date) {
    this.timestamp = timestamp;
    return this;
  }

  setTitle(title) {
    if (title.length > 256) throw new Error('EMBED_TITLE');
    this.title = title;
    return this;
  }

  setURL(url) {
    this.url = url;
    return this;
  }
}
module.exports = Embed;
