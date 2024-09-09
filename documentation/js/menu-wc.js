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
                    <a href="index.html" data-type="index-link">latihan documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' : 'data-bs-target="#xs-controllers-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' :
                                            'id="xs-controllers-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' : 'data-bs-target="#xs-injectables-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' :
                                        'id="xs-injectables-links-module-AppModule-aa1021a582dd9c8693360abc59540a7f979a90355cebe982b6e9b63771e8dcaedce76f5d6bcf3803c78b5d6435392a54aaeb725039df8edf03d3cdfeab4c1948"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' :
                                            'id="xs-controllers-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' :
                                        'id="xs-injectables-links-module-AuthModule-fd76980bcab3bc1a545d96f1562d712b06c0e06a20787aa38bd07e95784984b157f094c1b2cb89d7a45d3ee15c6b8514ea45a483ae718a09e7c8354c59dc8228"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' :
                                            'id="xs-controllers-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' :
                                        'id="xs-injectables-links-module-CategoriesModule-f78c28d5d855d9391936b68e72eb7709fcfc34805f88aab2670ba589ebe4510c0c02e37340cfbc2187a57f027e089248c7f4e48e4de823cd6937cee40c8de9a5"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' :
                                            'id="xs-controllers-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' }>
                                            <li class="link">
                                                <a href="controllers/ProductImagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductImagesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' :
                                        'id="xs-injectables-links-module-ProductsModule-96679822ff660dbfd8f4d0667ff8d5a4c7d6c37838a37c6637eab372ee1fa9e79bbbbadab109421051472e7b0081b412c534f30d6b5b85f6799484a1f9b2ca8e"' }>
                                        <li class="link">
                                            <a href="injectables/ProductImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductImagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UnitsModule.html" data-type="entity-link" >UnitsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' : 'data-bs-target="#xs-controllers-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' :
                                            'id="xs-controllers-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' }>
                                            <li class="link">
                                                <a href="controllers/UnitsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UnitsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' : 'data-bs-target="#xs-injectables-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' :
                                        'id="xs-injectables-links-module-UnitsModule-44699951950823438547b805a4e30cff5962b7e5faace6569edadd75094342d91f59f69908525f6fcf93003667d866c112d1511d8d2d8aeb089fb22e72654415"' }>
                                        <li class="link">
                                            <a href="injectables/UnitsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UnitsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductImagesController.html" data-type="entity-link" >ProductImagesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UnitsController.html" data-type="entity-link" >UnitsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/CategoryEntity.html" data-type="entity-link" >CategoryEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductEntity.html" data-type="entity-link" >ProductEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductImagesEntity.html" data-type="entity-link" >ProductImagesEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RoleEntity.html" data-type="entity-link" >RoleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UnitEntity.html" data-type="entity-link" >UnitEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
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
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDtoOut.html" data-type="entity-link" >CategoryDtoOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUnitDto.html" data-type="entity-link" >CreateUnitDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionDto.html" data-type="entity-link" >PermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDtoOut.html" data-type="entity-link" >ProductDtoOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductImagesDtoIn.html" data-type="entity-link" >ProductImagesDtoIn</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductImagesDtoOut.html" data-type="entity-link" >ProductImagesDtoOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileDto.html" data-type="entity-link" >ProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseFormatter.html" data-type="entity-link" >ResponseFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleDto.html" data-type="entity-link" >RoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnitDtoOut.html" data-type="entity-link" >UnitDtoOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUnitDto.html" data-type="entity-link" >UpdateUnitDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductImagesService.html" data-type="entity-link" >ProductImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UnitsService.html" data-type="entity-link" >UnitsService</a>
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
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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