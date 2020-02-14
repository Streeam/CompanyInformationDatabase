package com.streeam.cid.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.streeam.cid.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.streeam.cid.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.streeam.cid.domain.User.class.getName());
            createCache(cm, com.streeam.cid.domain.Authority.class.getName());
            createCache(cm, com.streeam.cid.domain.User.class.getName() + ".authorities");
            createCache(cm, com.streeam.cid.domain.Company.class.getName());
            createCache(cm, com.streeam.cid.domain.Company.class.getName() + ".employees");
            createCache(cm, com.streeam.cid.domain.Company.class.getName() + ".notifications");
            createCache(cm, com.streeam.cid.domain.Company.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.Company.class.getName() + ".customers");
            createCache(cm, com.streeam.cid.domain.Company.class.getName() + ".suppliers");
            createCache(cm, com.streeam.cid.domain.Customer.class.getName());
            createCache(cm, com.streeam.cid.domain.Customer.class.getName() + ".saleOrders");
            createCache(cm, com.streeam.cid.domain.Product.class.getName());
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".images");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".drawings");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".nonconformances");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".versions");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".boms");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".routings");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".suppliers");
            createCache(cm, com.streeam.cid.domain.Image.class.getName());
            createCache(cm, com.streeam.cid.domain.Drawing.class.getName());
            createCache(cm, com.streeam.cid.domain.Version.class.getName());
            createCache(cm, com.streeam.cid.domain.Routing.class.getName());
            createCache(cm, com.streeam.cid.domain.Routing.class.getName() + ".nonconformances");
            createCache(cm, com.streeam.cid.domain.Routing.class.getName() + ".versions");
            createCache(cm, com.streeam.cid.domain.Routing.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.Supplier.class.getName());
            createCache(cm, com.streeam.cid.domain.Supplier.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName());
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".notifications");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".amendments");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".internalNonConformances");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".supplierNonConformances");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".auditNonConformances");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".clientNonConformances");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".purchaseRequestParents");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".tasks");
            createCache(cm, com.streeam.cid.domain.Amendment.class.getName());
            createCache(cm, com.streeam.cid.domain.Amendment.class.getName() + ".tasks");
            createCache(cm, com.streeam.cid.domain.Amendment.class.getName() + ".images");
            createCache(cm, com.streeam.cid.domain.Amendment.class.getName() + ".drawings");
            createCache(cm, com.streeam.cid.domain.Prototype.class.getName());
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName());
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".tasks");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".images");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".drawings");
            createCache(cm, com.streeam.cid.domain.NonConformanceType.class.getName());
            createCache(cm, com.streeam.cid.domain.InternalNonConformance.class.getName());
            createCache(cm, com.streeam.cid.domain.SupplierNonConformance.class.getName());
            createCache(cm, com.streeam.cid.domain.AuditNonConformance.class.getName());
            createCache(cm, com.streeam.cid.domain.ClientNonConformance.class.getName());
            createCache(cm, com.streeam.cid.domain.Task.class.getName());
            createCache(cm, com.streeam.cid.domain.Task.class.getName() + ".progressTracks");
            createCache(cm, com.streeam.cid.domain.ProgressTrack.class.getName());
            createCache(cm, com.streeam.cid.domain.Notification.class.getName());
            createCache(cm, com.streeam.cid.domain.Roles.class.getName());
            createCache(cm, com.streeam.cid.domain.Bom.class.getName());
            createCache(cm, com.streeam.cid.domain.Bom.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.PurchaseRequestChild.class.getName());
            createCache(cm, com.streeam.cid.domain.PurchaseRequestParent.class.getName());
            createCache(cm, com.streeam.cid.domain.PurchaseRequestParent.class.getName() + ".purchaseRequestChildren");
            createCache(cm, com.streeam.cid.domain.SalesOrder.class.getName());
            createCache(cm, com.streeam.cid.domain.SalesOrder.class.getName() + ".purchaseRequestChildren");
            createCache(cm, com.streeam.cid.domain.SalesOrder.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".products");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".routings");
            createCache(cm, com.streeam.cid.domain.Product.class.getName() + ".nonConformanceDetails");
            createCache(cm, com.streeam.cid.domain.Routing.class.getName() + ".nonConformancesDetails");
            createCache(cm, com.streeam.cid.domain.Employee.class.getName() + ".nonConformanceDetails");
            createCache(cm, com.streeam.cid.domain.InternalNonConformance.class.getName() + ".employees");
            createCache(cm, com.streeam.cid.domain.ActionToBeTaken.class.getName());
            createCache(cm, com.streeam.cid.domain.ShortTermAction.class.getName());
            createCache(cm, com.streeam.cid.domain.LongTermAction.class.getName());
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".internalNonConformances");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".clientNonConformances");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".supplierNonConformances");
            createCache(cm, com.streeam.cid.domain.NonConformanceDetails.class.getName() + ".auditNonConformances");
            createCache(cm, com.streeam.cid.domain.Site.class.getName());
            createCache(cm, com.streeam.cid.domain.Department.class.getName());
            createCache(cm, com.streeam.cid.domain.InternalNonConformance.class.getName() + ".sites");
            createCache(cm, com.streeam.cid.domain.InternalNonConformance.class.getName() + ".departments");
            createCache(cm, com.streeam.cid.domain.ExtraRoutings.class.getName());
            createCache(cm, com.streeam.cid.domain.ExtraBoms.class.getName());
            createCache(cm, com.streeam.cid.domain.Site.class.getName() + ".internalNonConformances");
            createCache(cm, com.streeam.cid.domain.Department.class.getName() + ".internalNonConformances");
            createCache(cm, com.streeam.cid.domain.AfterSaleExpenses.class.getName());
            createCache(cm, com.streeam.cid.domain.ClientNonConformance.class.getName() + ".culpableEmployees");
            createCache(cm, com.streeam.cid.domain.FishBone.class.getName());
            createCache(cm, com.streeam.cid.domain.ProcessAuditChecklist.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
