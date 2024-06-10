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
                                            'data-bs-target="#controllers-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' : 'data-bs-target="#xs-controllers-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' :
                                            'id="xs-controllers-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' : 'data-bs-target="#xs-injectables-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' :
                                        'id="xs-injectables-links-module-AppModule-cdbbc2b18d9ea5ea3f43d80b5fe5d389095a001c4b4ebedd56ca72bd9e44a53833ca218b69dfcd42831b9b21581b367f9672c2e334065dd2a19e79712dd07607"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' :
                                            'id="xs-controllers-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' :
                                        'id="xs-injectables-links-module-AuthModule-cb545df0e0679a85f07c4994c93a9eb81bcfc6c930daaff84d51327652ec64dd614bf4b9647f3856db6abfb06545ffa51b80a98ab250c82d779d93e2edbbbcee"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' :
                                            'id="xs-controllers-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' :
                                        'id="xs-injectables-links-module-CategoriesModule-37bb0061c00610d62b077e69f97777273227bf5973035ff3bb46b60d9f7b779c6e931f63803f3b75aac500f4bf67cd132c977a865b23aa0fad30b4f5a5f6c8b7"' }>
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
                                            'data-bs-target="#controllers-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' :
                                            'id="xs-controllers-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' }>
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
                                        'data-bs-target="#injectables-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' :
                                        'id="xs-injectables-links-module-ProductsModule-cf127d3d110161cf75ba0cebbcca3ebbaef1c2691c642e11803ea19f6d25ac683fd51726a462ef0666511c60cb44f8d8bd9b348cbc5590a05466a771c3bbe904"' }>
                                        <li class="link">
                                            <a href="injectables/ProductImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductImagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="classes/CategoryDtoOut.html" data-type="entity-link" >CategoryDtoOut</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
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
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
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