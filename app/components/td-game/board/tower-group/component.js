import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    'selected:board__tower-group--selected',
    'groupRows1:board__tower-group--type-1',
    'groupRows2:board__tower-group--type-2',
    'groupRows3:board__tower-group--type-3'
  ],

  classNames: ['board__tower-group'],

  _clearPreviousStyles() {
    this.$().css('justify-content', 'flex-start');
    this.$().css('align-items', 'flex-start');
  },

  _getProperty(codeLine) {
    const codeLineLowerCase = codeLine.toLowerCase();
    const colonLocation = codeLineLowerCase.indexOf(':');

    return codeLineLowerCase.substring(0, colonLocation);
  },

  _getValue(codeLine, property) {
    const startIndex = property.length + 1;
    const endIndex = codeLine.length;
    return codeLine.substring(startIndex, endIndex).trim();
  },

  _getValueWithoutSemiColon(val) {
    const lastIndex = val.length - 1;
    if (val[lastIndex] === ';') {
      return val.substring(0, lastIndex);
    }
  },

  _styleFound(styleNeedle) {
    if (!styleNeedle) {
      return;
    }

    let styleApplicable = false;
    styleNeedle = styleNeedle.replace(/ /g,'');
    const towerGroupStyles = this.attrs.towerGroup.get('styles');

    if (towerGroupStyles) {
      towerGroupStyles.forEach((styleHaystack) => {
        if (styleHaystack.get('codeLine')) {
          const styleNoWhitespace = styleHaystack.get('codeLine').replace(/ /g,'');
          styleHaystack.set('codeLine', styleNoWhitespace);

          if (styleHaystack.get('codeLine') === styleNeedle) {
            styleApplicable = true;
          }
        }
      });
    }

    return styleApplicable;
  },

  groupTowers: Ember.computed('attrs.towerGroup', function () {
    let towers = [];

    this.attrs.towerGroup.get('towers').forEach((tower) => {
      towers.push(tower);
    });

    return towers;
  }),

  groupRows1: Ember.computed(
    'attrs.numRows',
    function () {
      return this.attrs.numRows === 1;
    }
  ),

  groupRows2: Ember.computed(
    'attrs.numRows',
    function () {
      return this.attrs.numRows === 2;
    }
  ),

  groupRows3: Ember.computed(
    'attrs.numRows',
    function () {
      return this.attrs.numRows === 3;
    }
  ),

  selected: Ember.computed(
    'attrs.selectedTowerGroup',
    'attrs.towerGroup',
    function () {
      return this.attrs.selectedTowerGroup === this.attrs.towerGroup ?
             true :
             false;
    }
  ),

  _updateCodeLines: Ember.observer(
    'attrs.towerGroup.styles',
    'attrs.towerGroup.styles.[]',
    'attrs.towerGroup.styles.length',
    'attrs.towerGroup.styles.@each.codeLine',
    'attrs.towerGroup.styles.@each.submitted',
    function () {
      const styles = this.attrs.towerGroup.get('styles');
      const styleFound = !!styles;

      let codeLineEmpty = true;
      if (styleFound) {
        const firstCodeLine = styles.get('firstObject');
        const codeLineLength = firstCodeLine.get('codeLine.length');
        codeLineEmpty = isNaN(codeLineLength) || codeLineLength < 1;
      }

      this._clearPreviousStyles();
      if (!styleFound || codeLineEmpty) {
        return;
      }

      styles.forEach((style) => {
        const codeLine = style.get('codeLine');

        if (this._styleFound(codeLine)) {
          const property = this._getProperty(codeLine);
          const value = this._getValue(codeLine, property);

          if (property && value) {
            this.$().css(property, this._getValueWithoutSemiColon(value));
          }
        }
      });
    }
  )
});
