'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">carbon-calculator documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' : 'data-target="#xs-components-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' :
                                            'id="xs-components-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarDiagramBothComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarDiagramBothComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarDiagramCompareComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarDiagramCompareComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarDiagramComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarDiagramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationDiagramCompareComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationDiagramCompareComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationDiagramComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationDiagramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationSelectCompareComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationSelectCompareComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCalculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCalculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateModuleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateModuleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramCompareDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiagramCompareDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiagramDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiagramDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmissionItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmissionItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmissionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmissionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FactorEmissionModuleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FactorEmissionModuleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileUploadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportFileDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportFileDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KonamiDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KonamiDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieDiagramComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PieDiagramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpecificCalculationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecificCalculationListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeDiagramComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeDiagramComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TypeEmissionModuleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypeEmissionModuleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TypeInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TypeInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' : 'data-target="#xs-injectables-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' :
                                        'id="xs-injectables-links-module-AppModule-c5d73c9cd3952c6da4bd0f832fad6cbf07420bf0679396ca493ec413e1e39bb1802e2b2ab4002dc5ee5c5d9226ef61cdd79a5f9a474091dc0786290247120673"' }>
                                        <li class="link">
                                            <a href="injectables/CalculationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NavigationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdvancedEmissionModule.html" data-type="entity-link" >AdvancedEmissionModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdvancedSerializer.html" data-type="entity-link" >AdvancedSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Calculation.html" data-type="entity-link" >Calculation</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmissionsManager.html" data-type="entity-link" >EmissionsManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/FactorEmissionModule.html" data-type="entity-link" >FactorEmissionModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/FactorManager.html" data-type="entity-link" >FactorManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/FactorProvider.html" data-type="entity-link" >FactorProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/FactorSerializer.html" data-type="entity-link" >FactorSerializer</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/TranslationManagerService.html" data-type="entity-link" >TranslationManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdvancedSubModule.html" data-type="entity-link" >AdvancedSubModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalculationCardData.html" data-type="entity-link" >CalculationCardData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalculationData.html" data-type="entity-link" >CalculationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagramData.html" data-type="entity-link" >DiagramData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiagramDataCompare.html" data-type="entity-link" >DiagramDataCompare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData-1.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmissionModule.html" data-type="entity-link" >EmissionModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImportData.html" data-type="entity-link" >ImportData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Language.html" data-type="entity-link" >Language</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuPoint.html" data-type="entity-link" >MenuPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModuleType.html" data-type="entity-link" >ModuleType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Serializer.html" data-type="entity-link" >Serializer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableData.html" data-type="entity-link" >TableData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tree.html" data-type="entity-link" >Tree</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});