package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "part_number", nullable = false, unique = true)
    private String partNumber;

    @NotNull
    @Column(name = "part_description", nullable = false)
    private String partDescription;

    @NotNull
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @NotNull
    @Column(name = "product_group_code", nullable = false)
    private String productGroupCode;

    @Column(name = "site")
    private String site;

    @Column(name = "departament")
    private String departament;

    @NotNull
    @Column(name = "method_type", nullable = false)
    private String methodType;

    @NotNull
    @Column(name = "method_status", nullable = false)
    private String methodStatus;

    @NotNull
    @Column(name = "prime", nullable = false)
    private Boolean prime;

    @Column(name = "unit_of_measure")
    private String unitOfMeasure;


    @Column(name = "supplier_part_number", unique = true)
    private String supplierPartNumber;

    @Column(name = "supplier_part_description")
    private String supplierPartDescription;

    @Column(name = "curency")
    private String curency;

    @Min(value = 0)
    @Column(name = "lead_time")
    private Integer leadTime;

    @DecimalMin(value = "0")
    @Column(name = "min_quantity")
    private Double minQuantity;

    @DecimalMin(value = "0")
    @Column(name = "latest_unit_material_cost", precision = 21, scale = 2)
    private BigDecimal latestUnitMaterialCost;

    @DecimalMin(value = "0")
    @Column(name = "cost_in_supplier_currency", precision = 21, scale = 2)
    private BigDecimal costInSupplierCurrency;

    @DecimalMin(value = "0")
    @Column(name = "supplier_price", precision = 21, scale = 2)
    private BigDecimal supplierPrice;

    @DecimalMin(value = "0")
    @Column(name = "cost_in_base_currency", precision = 21, scale = 2)
    private BigDecimal costInBaseCurrency;

    @DecimalMin(value = "0")
    @Column(name = "scrap_percentage")
    private Double scrapPercentage;

    @DecimalMin(value = "0")
    @Column(name = "on_hand_stock")
    private Double onHandStock;

    @DecimalMin(value = "0")
    @Column(name = "standard_component_cost", precision = 21, scale = 2)
    private BigDecimal standardComponentCost;

    @DecimalMin(value = "0")
    @Column(name = "standard_sub_contract_cost", precision = 21, scale = 2)
    private BigDecimal standardSubContractCost;

    @DecimalMin(value = "0")
    @Column(name = "standard_unit_material_cost", precision = 21, scale = 2)
    private BigDecimal standardUnitMaterialCost;

    @DecimalMin(value = "0")
    @Column(name = "standard_set_cost", precision = 21, scale = 2)
    private BigDecimal standardSetCost;

    @DecimalMin(value = "0")
    @Column(name = "standard_run_cost", precision = 21, scale = 2)
    private BigDecimal standardRunCost;

    @DecimalMin(value = "0")
    @Column(name = "standard_landed_cost_1", precision = 21, scale = 2)
    private BigDecimal standardLandedCost1;

    @DecimalMin(value = "0")
    @Column(name = "standard_landed_cost_2", precision = 21, scale = 2)
    private BigDecimal standardLandedCost2;

    @DecimalMin(value = "0")
    @Column(name = "standard_landed_cost_3", precision = 21, scale = 2)
    private BigDecimal standardLandedCost3;

    @Column(name = "comment_1")
    private String comment1;

    @Column(name = "comment_2")
    private String comment2;

    @Column(name = "comment_3")
    private String comment3;

    @Column(name = "review_date_1")
    private LocalDate reviewDate1;

    @Column(name = "review_date_2")
    private LocalDate reviewDate2;

    @Column(name = "review_date_3")
    private LocalDate reviewDate3;

    @DecimalMin(value = "0")
    @Column(name = "standard_total_cost", precision = 21, scale = 2)
    private BigDecimal standardTotalCost;

    @DecimalMin(value = "0")
    @Column(name = "min_barch_size")
    private Double minBarchSize;

    @NotNull
    @Column(name = "obsolete", nullable = false)
    private Boolean obsolete;

    @Min(value = 0)
    @Column(name = "order_multipler")
    private Integer orderMultipler;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Drawing> drawings = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Version> versions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_bom",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "bom_id", referencedColumnName = "id"))
    private Set<Bom> boms = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_routings",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "routings_id", referencedColumnName = "id"))
    private Set<Routing> routings = new HashSet<>();

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Supplier> suppliers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("products")
    private SalesOrder salesOrder;

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<NonConformanceDetails> nonConformanceDetails = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public Product partNumber(String partNumber) {
        this.partNumber = partNumber;
        return this;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getPartDescription() {
        return partDescription;
    }

    public Product partDescription(String partDescription) {
        this.partDescription = partDescription;
        return this;
    }

    public void setPartDescription(String partDescription) {
        this.partDescription = partDescription;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public Product releaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getProductGroupCode() {
        return productGroupCode;
    }

    public Product productGroupCode(String productGroupCode) {
        this.productGroupCode = productGroupCode;
        return this;
    }

    public void setProductGroupCode(String productGroupCode) {
        this.productGroupCode = productGroupCode;
    }

    public String getSite() {
        return site;
    }

    public Product site(String site) {
        this.site = site;
        return this;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getDepartament() {
        return departament;
    }

    public Product departament(String departament) {
        this.departament = departament;
        return this;
    }

    public void setDepartament(String departament) {
        this.departament = departament;
    }

    public String getMethodType() {
        return methodType;
    }

    public Product methodType(String methodType) {
        this.methodType = methodType;
        return this;
    }

    public void setMethodType(String methodType) {
        this.methodType = methodType;
    }

    public String getMethodStatus() {
        return methodStatus;
    }

    public Product methodStatus(String methodStatus) {
        this.methodStatus = methodStatus;
        return this;
    }

    public void setMethodStatus(String methodStatus) {
        this.methodStatus = methodStatus;
    }

    public Boolean isPrime() {
        return prime;
    }

    public Product prime(Boolean prime) {
        this.prime = prime;
        return this;
    }

    public void setPrime(Boolean prime) {
        this.prime = prime;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public Product unitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
        return this;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public String getSupplierPartNumber() {
        return supplierPartNumber;
    }

    public Product supplierPartNumber(String supplierPartNumber) {
        this.supplierPartNumber = supplierPartNumber;
        return this;
    }

    public void setSupplierPartNumber(String supplierPartNumber) {
        this.supplierPartNumber = supplierPartNumber;
    }

    public String getSupplierPartDescription() {
        return supplierPartDescription;
    }

    public Product supplierPartDescription(String supplierPartDescription) {
        this.supplierPartDescription = supplierPartDescription;
        return this;
    }

    public void setSupplierPartDescription(String supplierPartDescription) {
        this.supplierPartDescription = supplierPartDescription;
    }

    public String getCurency() {
        return curency;
    }

    public Product curency(String curency) {
        this.curency = curency;
        return this;
    }

    public void setCurency(String curency) {
        this.curency = curency;
    }

    public Integer getLeadTime() {
        return leadTime;
    }

    public Product leadTime(Integer leadTime) {
        this.leadTime = leadTime;
        return this;
    }

    public void setLeadTime(Integer leadTime) {
        this.leadTime = leadTime;
    }

    public Double getMinQuantity() {
        return minQuantity;
    }

    public Product minQuantity(Double minQuantity) {
        this.minQuantity = minQuantity;
        return this;
    }

    public void setMinQuantity(Double minQuantity) {
        this.minQuantity = minQuantity;
    }

    public BigDecimal getLatestUnitMaterialCost() {
        return latestUnitMaterialCost;
    }

    public Product latestUnitMaterialCost(BigDecimal latestUnitMaterialCost) {
        this.latestUnitMaterialCost = latestUnitMaterialCost;
        return this;
    }

    public void setLatestUnitMaterialCost(BigDecimal latestUnitMaterialCost) {
        this.latestUnitMaterialCost = latestUnitMaterialCost;
    }

    public BigDecimal getCostInSupplierCurrency() {
        return costInSupplierCurrency;
    }

    public Product costInSupplierCurrency(BigDecimal costInSupplierCurrency) {
        this.costInSupplierCurrency = costInSupplierCurrency;
        return this;
    }

    public void setCostInSupplierCurrency(BigDecimal costInSupplierCurrency) {
        this.costInSupplierCurrency = costInSupplierCurrency;
    }

    public BigDecimal getSupplierPrice() {
        return supplierPrice;
    }

    public Product supplierPrice(BigDecimal supplierPrice) {
        this.supplierPrice = supplierPrice;
        return this;
    }

    public void setSupplierPrice(BigDecimal supplierPrice) {
        this.supplierPrice = supplierPrice;
    }

    public BigDecimal getCostInBaseCurrency() {
        return costInBaseCurrency;
    }

    public Product costInBaseCurrency(BigDecimal costInBaseCurrency) {
        this.costInBaseCurrency = costInBaseCurrency;
        return this;
    }

    public void setCostInBaseCurrency(BigDecimal costInBaseCurrency) {
        this.costInBaseCurrency = costInBaseCurrency;
    }

    public Double getScrapPercentage() {
        return scrapPercentage;
    }

    public Product scrapPercentage(Double scrapPercentage) {
        this.scrapPercentage = scrapPercentage;
        return this;
    }

    public void setScrapPercentage(Double scrapPercentage) {
        this.scrapPercentage = scrapPercentage;
    }

    public Double getOnHandStock() {
        return onHandStock;
    }

    public Product onHandStock(Double onHandStock) {
        this.onHandStock = onHandStock;
        return this;
    }

    public void setOnHandStock(Double onHandStock) {
        this.onHandStock = onHandStock;
    }

    public BigDecimal getStandardComponentCost() {
        return standardComponentCost;
    }

    public Product standardComponentCost(BigDecimal standardComponentCost) {
        this.standardComponentCost = standardComponentCost;
        return this;
    }

    public void setStandardComponentCost(BigDecimal standardComponentCost) {
        this.standardComponentCost = standardComponentCost;
    }

    public BigDecimal getStandardSubContractCost() {
        return standardSubContractCost;
    }

    public Product standardSubContractCost(BigDecimal standardSubContractCost) {
        this.standardSubContractCost = standardSubContractCost;
        return this;
    }

    public void setStandardSubContractCost(BigDecimal standardSubContractCost) {
        this.standardSubContractCost = standardSubContractCost;
    }

    public BigDecimal getStandardUnitMaterialCost() {
        return standardUnitMaterialCost;
    }

    public Product standardUnitMaterialCost(BigDecimal standardUnitMaterialCost) {
        this.standardUnitMaterialCost = standardUnitMaterialCost;
        return this;
    }

    public void setStandardUnitMaterialCost(BigDecimal standardUnitMaterialCost) {
        this.standardUnitMaterialCost = standardUnitMaterialCost;
    }

    public BigDecimal getStandardSetCost() {
        return standardSetCost;
    }

    public Product standardSetCost(BigDecimal standardSetCost) {
        this.standardSetCost = standardSetCost;
        return this;
    }

    public void setStandardSetCost(BigDecimal standardSetCost) {
        this.standardSetCost = standardSetCost;
    }

    public BigDecimal getStandardRunCost() {
        return standardRunCost;
    }

    public Product standardRunCost(BigDecimal standardRunCost) {
        this.standardRunCost = standardRunCost;
        return this;
    }

    public void setStandardRunCost(BigDecimal standardRunCost) {
        this.standardRunCost = standardRunCost;
    }

    public BigDecimal getStandardLandedCost1() {
        return standardLandedCost1;
    }

    public Product standardLandedCost1(BigDecimal standardLandedCost1) {
        this.standardLandedCost1 = standardLandedCost1;
        return this;
    }

    public void setStandardLandedCost1(BigDecimal standardLandedCost1) {
        this.standardLandedCost1 = standardLandedCost1;
    }

    public BigDecimal getStandardLandedCost2() {
        return standardLandedCost2;
    }

    public Product standardLandedCost2(BigDecimal standardLandedCost2) {
        this.standardLandedCost2 = standardLandedCost2;
        return this;
    }

    public void setStandardLandedCost2(BigDecimal standardLandedCost2) {
        this.standardLandedCost2 = standardLandedCost2;
    }

    public BigDecimal getStandardLandedCost3() {
        return standardLandedCost3;
    }

    public Product standardLandedCost3(BigDecimal standardLandedCost3) {
        this.standardLandedCost3 = standardLandedCost3;
        return this;
    }

    public void setStandardLandedCost3(BigDecimal standardLandedCost3) {
        this.standardLandedCost3 = standardLandedCost3;
    }

    public String getComment1() {
        return comment1;
    }

    public Product comment1(String comment1) {
        this.comment1 = comment1;
        return this;
    }

    public void setComment1(String comment1) {
        this.comment1 = comment1;
    }

    public String getComment2() {
        return comment2;
    }

    public Product comment2(String comment2) {
        this.comment2 = comment2;
        return this;
    }

    public void setComment2(String comment2) {
        this.comment2 = comment2;
    }

    public String getComment3() {
        return comment3;
    }

    public Product comment3(String comment3) {
        this.comment3 = comment3;
        return this;
    }

    public void setComment3(String comment3) {
        this.comment3 = comment3;
    }

    public LocalDate getReviewDate1() {
        return reviewDate1;
    }

    public Product reviewDate1(LocalDate reviewDate1) {
        this.reviewDate1 = reviewDate1;
        return this;
    }

    public void setReviewDate1(LocalDate reviewDate1) {
        this.reviewDate1 = reviewDate1;
    }

    public LocalDate getReviewDate2() {
        return reviewDate2;
    }

    public Product reviewDate2(LocalDate reviewDate2) {
        this.reviewDate2 = reviewDate2;
        return this;
    }

    public void setReviewDate2(LocalDate reviewDate2) {
        this.reviewDate2 = reviewDate2;
    }

    public LocalDate getReviewDate3() {
        return reviewDate3;
    }

    public Product reviewDate3(LocalDate reviewDate3) {
        this.reviewDate3 = reviewDate3;
        return this;
    }

    public void setReviewDate3(LocalDate reviewDate3) {
        this.reviewDate3 = reviewDate3;
    }

    public BigDecimal getStandardTotalCost() {
        return standardTotalCost;
    }

    public Product standardTotalCost(BigDecimal standardTotalCost) {
        this.standardTotalCost = standardTotalCost;
        return this;
    }

    public void setStandardTotalCost(BigDecimal standardTotalCost) {
        this.standardTotalCost = standardTotalCost;
    }

    public Double getMinBarchSize() {
        return minBarchSize;
    }

    public Product minBarchSize(Double minBarchSize) {
        this.minBarchSize = minBarchSize;
        return this;
    }

    public void setMinBarchSize(Double minBarchSize) {
        this.minBarchSize = minBarchSize;
    }

    public Boolean isObsolete() {
        return obsolete;
    }

    public Product obsolete(Boolean obsolete) {
        this.obsolete = obsolete;
        return this;
    }

    public void setObsolete(Boolean obsolete) {
        this.obsolete = obsolete;
    }

    public Integer getOrderMultipler() {
        return orderMultipler;
    }

    public Product orderMultipler(Integer orderMultipler) {
        this.orderMultipler = orderMultipler;
        return this;
    }

    public void setOrderMultipler(Integer orderMultipler) {
        this.orderMultipler = orderMultipler;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Product images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Product addImages(Image image) {
        this.images.add(image);
        image.setProduct(this);
        return this;
    }

    public Product removeImages(Image image) {
        this.images.remove(image);
        image.setProduct(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Drawing> getDrawings() {
        return drawings;
    }

    public Product drawings(Set<Drawing> drawings) {
        this.drawings = drawings;
        return this;
    }

    public Product addDrawings(Drawing drawing) {
        this.drawings.add(drawing);
        drawing.setProduct(this);
        return this;
    }

    public Product removeDrawings(Drawing drawing) {
        this.drawings.remove(drawing);
        drawing.setProduct(null);
        return this;
    }

    public void setDrawings(Set<Drawing> drawings) {
        this.drawings = drawings;
    }

    public Set<Version> getVersions() {
        return versions;
    }

    public Product versions(Set<Version> versions) {
        this.versions = versions;
        return this;
    }

    public Product addVersion(Version version) {
        this.versions.add(version);
        version.setProduct(this);
        return this;
    }

    public Product removeVersion(Version version) {
        this.versions.remove(version);
        version.setProduct(null);
        return this;
    }

    public void setVersions(Set<Version> versions) {
        this.versions = versions;
    }

    public Set<Bom> getBoms() {
        return boms;
    }

    public Product boms(Set<Bom> boms) {
        this.boms = boms;
        return this;
    }

    public Product addBom(Bom bom) {
        this.boms.add(bom);
        bom.getProducts().add(this);
        return this;
    }

    public Product removeBom(Bom bom) {
        this.boms.remove(bom);
        bom.getProducts().remove(this);
        return this;
    }

    public void setBoms(Set<Bom> boms) {
        this.boms = boms;
    }

    public Set<Routing> getRoutings() {
        return routings;
    }

    public Product routings(Set<Routing> routings) {
        this.routings = routings;
        return this;
    }

    public Product addRoutings(Routing routing) {
        this.routings.add(routing);
        routing.getProducts().add(this);
        return this;
    }

    public Product removeRoutings(Routing routing) {
        this.routings.remove(routing);
        routing.getProducts().remove(this);
        return this;
    }

    public void setRoutings(Set<Routing> routings) {
        this.routings = routings;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public Product suppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
        return this;
    }

    public Product addSupplier(Supplier supplier) {
        this.suppliers.add(supplier);
        supplier.getProducts().add(this);
        return this;
    }

    public Product removeSupplier(Supplier supplier) {
        this.suppliers.remove(supplier);
        supplier.getProducts().remove(this);
        return this;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public SalesOrder getSalesOrder() {
        return salesOrder;
    }

    public Product salesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
        return this;
    }

    public void setSalesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
    }

    public Set<NonConformanceDetails> getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public Product nonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
        return this;
    }

    public Product addNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.add(nonConformanceDetails);
        nonConformanceDetails.getProducts().add(this);
        return this;
    }

    public Product removeNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.remove(nonConformanceDetails);
        nonConformanceDetails.getProducts().remove(this);
        return this;
    }

    public void setNonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", partNumber='" + getPartNumber() + "'" +
            ", partDescription='" + getPartDescription() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", productGroupCode='" + getProductGroupCode() + "'" +
            ", site='" + getSite() + "'" +
            ", departament='" + getDepartament() + "'" +
            ", methodType='" + getMethodType() + "'" +
            ", methodStatus='" + getMethodStatus() + "'" +
            ", prime='" + isPrime() + "'" +
            ", unitOfMeasure='" + getUnitOfMeasure() + "'" +
            ", supplierPartNumber='" + getSupplierPartNumber() + "'" +
            ", supplierPartDescription='" + getSupplierPartDescription() + "'" +
            ", curency='" + getCurency() + "'" +
            ", leadTime=" + getLeadTime() +
            ", minQuantity=" + getMinQuantity() +
            ", latestUnitMaterialCost=" + getLatestUnitMaterialCost() +
            ", costInSupplierCurrency=" + getCostInSupplierCurrency() +
            ", supplierPrice=" + getSupplierPrice() +
            ", costInBaseCurrency=" + getCostInBaseCurrency() +
            ", scrapPercentage=" + getScrapPercentage() +
            ", onHandStock=" + getOnHandStock() +
            ", standardComponentCost=" + getStandardComponentCost() +
            ", standardSubContractCost=" + getStandardSubContractCost() +
            ", standardUnitMaterialCost=" + getStandardUnitMaterialCost() +
            ", standardSetCost=" + getStandardSetCost() +
            ", standardRunCost=" + getStandardRunCost() +
            ", standardLandedCost1=" + getStandardLandedCost1() +
            ", standardLandedCost2=" + getStandardLandedCost2() +
            ", standardLandedCost3=" + getStandardLandedCost3() +
            ", comment1='" + getComment1() + "'" +
            ", comment2='" + getComment2() + "'" +
            ", comment3='" + getComment3() + "'" +
            ", reviewDate1='" + getReviewDate1() + "'" +
            ", reviewDate2='" + getReviewDate2() + "'" +
            ", reviewDate3='" + getReviewDate3() + "'" +
            ", standardTotalCost=" + getStandardTotalCost() +
            ", minBarchSize=" + getMinBarchSize() +
            ", obsolete='" + isObsolete() + "'" +
            ", orderMultipler=" + getOrderMultipler() +
            "}";
    }
}
