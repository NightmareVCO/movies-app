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
                    <a href="index.html" data-type="index-link">movies_app-prisma documentation</a>
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' : 'data-bs-target="#xs-controllers-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' :
                                            'id="xs-controllers-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' :
                                        'id="xs-injectables-links-module-AppModule-2497e30b817834fa1d330462c65390efea9340da79e114479dfd730d488bcb71777161e82f73c8341ebac7fb77cd204a72262193ec80a43c1de84fe8c565c3e7"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MoviesModule.html" data-type="entity-link" >MoviesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' : 'data-bs-target="#xs-controllers-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' :
                                            'id="xs-controllers-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' }>
                                            <li class="link">
                                                <a href="controllers/MoviesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoviesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' : 'data-bs-target="#xs-injectables-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' :
                                        'id="xs-injectables-links-module-MoviesModule-04b7b96b0017e937f13174e4cac5c86fdc874570eb5f9f2e3d748090a514f89d556c2e30ccdf48a1f6d8eb21fc4bb2e12721d9c7d7bfa8bc8348114244a0ad6d"' }>
                                        <li class="link">
                                            <a href="injectables/MoviesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoviesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateMovieDto.html" data-type="entity-link" >CreateMovieDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Movie.html" data-type="entity-link" >Movie</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMovieDto.html" data-type="entity-link" >UpdateMovieDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});