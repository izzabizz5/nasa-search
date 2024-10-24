import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.secondaryCreator = "";
    this.otherText=""
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        secondaryCreator: { type: String},
        otherText: { type: String}
    };
  }

  static get styles() {
    return [css`
    :host{
      display: inline-block;
      background-color: var(--simple-colors-default-theme-brown-2);
      margin: var(--ddd-spacing-4);
      height: 240px;
      width: 240px;
    }  
    .image {
      display: inline-block;
      border-color: black;  
    }
    .image:hover {
      opacity: 50%
    }
    .image div {
      width: 240px;
      height: 240px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }

    .image img {
      display: block;
      width: 200px;
      height: 200px;
      margin: auto;
    }
    `];
  }

  render() {
    return html`
      <div class="image">
        <img src="${this.source}" alt="${this.otherText}"/>
        <div>${this.title}</div>
      </div>
    </a>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);