/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./nasa-image.js";

/**
 * `nasa-search`
 * comment
 * @demo index.html
 * @element nasa-search
 */
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
      a::selection {
        opacity: 50%;
      }
      a:link {
        text-decoration:none;
      }
      a:visited {
        text-decoration:none;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

openEnter(e) {
  window.open('whatever.com', '_blank');
}

  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search inputs</summary>
      <div>
        <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
      </div>
    </details>
    <div class="results">
    <a href="" target="_blank"></a>
    <div class="some-random-thing" @click="${this.openEnter}"></div>
      ${this.items.map((item, index) => html`
        <a href="${item.links[0].href}" target="_blank"></a>
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        @click="${() => this.openImageInNewTab(item.links[0].href)}"
        alt="${item.data[0].description}"
        secondaryCreator="${item.data[0].secondary_creator}"
      ></nasa-image>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  openImageInNewTab(url) {
    window.open(url, '_blank');
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);