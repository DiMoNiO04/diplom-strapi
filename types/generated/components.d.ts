import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksSimpleContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_simple_contents';
  info: {
    description: '';
    displayName: 'simpleContent';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    texts: Schema.Attribute.Component<'shared.text', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSimpleContentWithBtn extends Struct.ComponentSchema {
  collectionName: 'components_blocks_simple_content_with_btns';
  info: {
    description: '';
    displayName: 'simpleContentWithBtn';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.btn', false>;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    texts: Schema.Attribute.Component<'shared.text', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTitleWithTexts extends Struct.ComponentSchema {
  collectionName: 'components_blocks_title_with_texts';
  info: {
    description: '';
    displayName: 'titleWithTexts';
  };
  attributes: {
    texts: Schema.Attribute.Component<'shared.text', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBtn extends Struct.ComponentSchema {
  collectionName: 'components_shared_btns';
  info: {
    description: '';
    displayName: 'btn';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: '';
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'categories/'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String & Schema.Attribute.DefaultTo<'categories/'>;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.simple-content': BlocksSimpleContent;
      'blocks.simple-content-with-btn': BlocksSimpleContentWithBtn;
      'blocks.title-with-texts': BlocksTitleWithTexts;
      'shared.btn': SharedBtn;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'shared.text': SharedText;
    }
  }
}
